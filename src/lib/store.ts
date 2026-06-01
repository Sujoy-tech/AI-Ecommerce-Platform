import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.productId === item.productId);

        if (existingItem) {
          set({
            items: currentItems.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({ items: [...currentItems, { ...item, quantity: 1 }] });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.productId !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set({ isOpen: !get().isOpen }),

      getTotalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
      getTotalPrice: () =>
        get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    {
      name: "nexusai-cart",
    }
  )
);

interface SearchStore {
  query: string;
  results: any[];
  isLoading: boolean;
  searchType: "semantic" | "visual" | "text";
  setQuery: (query: string) => void;
  setResults: (results: any[]) => void;
  setIsLoading: (loading: boolean) => void;
  setSearchType: (type: "semantic" | "visual" | "text") => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: "",
  results: [],
  isLoading: false,
  searchType: "semantic",
  setQuery: (query) => set({ query }),
  setResults: (results) => set({ results }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setSearchType: (searchType) => set({ searchType }),
}));

interface ChatStore {
  isOpen: boolean;
  messages: { role: "user" | "assistant"; content: string }[];
  isTyping: boolean;
  toggleChat: () => void;
  addMessage: (message: { role: "user" | "assistant"; content: string }) => void;
  setIsTyping: (typing: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  isOpen: false,
  messages: [
    {
      role: "assistant",
      content: "Hi! I'm NexusAI Assistant. I can help you find products, compare options, track orders, or answer any questions. How can I help you today?",
    },
  ],
  isTyping: false,
  toggleChat: () => set({ isOpen: !get().isOpen }),
  addMessage: (message) => set({ messages: [...get().messages, message] }),
  setIsTyping: (isTyping) => set({ isTyping }),
  clearMessages: () =>
    set({
      messages: [
        {
          role: "assistant",
          content: "Hi! I'm NexusAI Assistant. How can I help you today?",
        },
      ],
    }),
}));
