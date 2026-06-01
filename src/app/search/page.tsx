"use client";

import { useState, useRef } from "react";import Image from \"next/image\";import { motion } from "framer-motion";
import { Search, Camera, Upload, Loader2, Sparkles, X } from "lucide-react";
import { useSearchStore } from "@/lib/store";
import { ProductCard } from "@/components/products/ProductCard";

export default function SearchPage() {
  const { query, results, isLoading, searchType, setQuery, setResults, setIsLoading, setSearchType } =
    useSearchStore();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSemanticSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/ai/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVisualSearch = async (file: File) => {
    setIsLoading(true);
    setSearchType("visual");
    
    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/ai/visual-search", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Visual search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSemanticSearch();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-4">
            <span className="gradient-text">AI-Powered</span> Search
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Search naturally. Our AI understands what you&apos;re looking for, not just keywords.
          </p>
        </motion.div>

        {/* Search Type Tabs */}
        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={() => setSearchType("semantic")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
              searchType === "semantic"
                ? "gradient-primary text-white"
                : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Semantic Search
          </button>
          <button
            onClick={() => setSearchType("visual")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
              searchType === "visual"
                ? "gradient-primary text-white"
                : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200"
            }`}
          >
            <Camera className="w-4 h-4" />
            Visual Search
          </button>
        </div>

        {/* Semantic Search Input */}
        {searchType === "semantic" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative max-w-2xl mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Try: 'wireless headphones for working out' or 'gift for a programmer'"
              className="w-full pl-12 pr-32 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl text-lg focus:outline-none focus:border-primary transition-colors"
            />
            <button
              onClick={handleSemanticSearch}
              disabled={isLoading || !query.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 gradient-primary text-white px-6 py-2.5 rounded-xl font-medium disabled:opacity-50 hover:opacity-90 transition-opacity"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Search"
              )}
            </button>
          </motion.div>
        )}

        {/* Visual Search Upload */}
        {searchType === "visual" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto"
          >
            {imagePreview ? (
              <div className="relative inline-block">
                <Image
                  src={imagePreview}
                  alt="Search image"
                  width={500}
                  height={256}
                  className="max-h-64 rounded-2xl border-2 border-dashed border-gray-300"
                />
                <button
                  onClick={() => {
                    setImagePreview(null);
                    setResults([]);
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-12 cursor-pointer hover:border-primary transition-colors"
              >
                <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">Upload an image to search</p>
                <p className="text-sm text-muted-foreground">
                  Our AI will find similar products using computer vision
                </p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleVisualSearch(file);
              }}
            />
          </motion.div>
        )}

        {/* Example Queries */}
        {searchType === "semantic" && !results.length && !isLoading && (
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <p className="text-sm text-muted-foreground w-full mb-2">Try these:</p>
            {[
              "something to improve my posture while working",
              "eco-friendly products under $100",
              "tech gadgets for a home office setup",
              "premium audio for music lovers",
            ].map((example) => (
              <button
                key={example}
                onClick={() => {
                  setQuery(example);
                  setTimeout(handleSemanticSearch, 100);
                }}
                className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-xs hover:bg-gray-200 transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">
              {searchType === "visual"
                ? "Analyzing image with computer vision..."
                : "Running semantic search with AI embeddings..."}
            </p>
          </div>
        </div>
      )}

      {!isLoading && results.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              {results.length} Results Found
            </h2>
            <span className="text-sm text-muted-foreground bg-purple-50 dark:bg-purple-900/20 px-3 py-1 rounded-full">
              <Sparkles className="w-3 h-3 inline mr-1" />
              AI-ranked by relevance
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((product: any) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
