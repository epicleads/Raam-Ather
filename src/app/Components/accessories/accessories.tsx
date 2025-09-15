import React, { useState, useEffect, useCallback } from 'react';
import { Search, Grid, List, ShoppingCart, Heart, Eye } from 'lucide-react';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  category: string;
  subcategory?: string;
  description: string;
  features: string[];
  compatibility: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  tags: string[];
  specifications?: Record<string, string>;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

const AtherAccessoriesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const productsPerPage = 12;

  // SEO setup effect
  useEffect(() => {
    document.title = "Ather Accessories - Premium Electric Scooter Accessories | Raam Ather";
    
    const setMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    setMetaTag('description', 'Shop premium Ather accessories including helmets, bags, phone mounts, and charging cables. Authorized dealer in Hyderabad and Chennai with fast delivery.');
    setMetaTag('keywords', 'Ather accessories, electric scooter accessories, Ather helmet, tank bag, phone mount, charging cable, Hyderabad, Chennai');
  }, []);

  // Fetch products
  const fetchProducts = useCallback(async (reset = false) => {
    try {
      setLoading(true);
      const offset = reset ? 0 : (currentPage - 1) * productsPerPage;
      
      const params = new URLSearchParams({
        category: selectedCategory,
        search: searchTerm,
        sort: sortBy,
        order: sortOrder,
        limit: productsPerPage.toString(),
        offset: offset.toString(),
        inStock: 'true'
      });

      const response = await fetch(`/api/products?${params}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      
      const result = await response.json();
      
      if (result.success) {
        if (reset) {
          setProducts(result.data.products);
        } else {
          setProducts(prev => [...prev, ...result.data.products]);
        }
        setCategories(result.data.categories);
        setTotalProducts(result.data.pagination.total);
        setHasMore(result.data.pagination.hasMore);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchTerm, sortBy, sortOrder, currentPage]);

  // Initial fetch
  useEffect(() => {
    setCurrentPage(1);
    fetchProducts(true);
  }, [selectedCategory, searchTerm, sortBy, sortOrder, fetchProducts]);

  // Load more products
  const loadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  useEffect(() => {
    if (currentPage > 1) {
      fetchProducts(false);
    }
  }, [currentPage, fetchProducts]);

  // Product card component with hover effects
  const ProductCard = ({ product }: { product: Product }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div 
        className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-green-200 transition-all duration-300 transform hover:-translate-y-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={product.images[currentImageIndex] || '/images/placeholder-product.jpg'}
            alt={product.name}
            fill
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                NEW
              </span>
            )}
            {product.isBestseller && (
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                BESTSELLER
              </span>
            )}
            {product.discount && (
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <button className="bg-white rounded-full p-2 shadow-lg hover:bg-green-50 hover:text-green-600 transition-colors">
              <Heart className="w-4 h-4" />
            </button>
            <button className="bg-white rounded-full p-2 shadow-lg hover:bg-green-50 hover:text-green-600 transition-colors">
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Image Navigation Dots */}
          {product.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex gap-1">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-green-500' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Stock Status */}
          <div className="absolute bottom-4 right-4">
            {product.inStock ? (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                In Stock
              </span>
            ) : (
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                Out of Stock
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          {/* Category */}
          <p className="text-sm text-gray-500 mb-2 font-medium">{product.category}</p>
          
          {/* Product Name */}
          <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
            {product.name}
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Features */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {product.features.slice(0, 2).map((feature, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                >
                  {feature}
                </span>
              ))}
              {product.features.length > 2 && (
                <span className="text-gray-500 text-xs px-2 py-1">
                  +{product.features.length - 2} more
                </span>
              )}
            </div>
          </div>

          {/* Compatibility */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-1">Compatible with:</p>
            <p className="text-sm font-medium text-gray-700">
              {product.compatibility.join(', ')}
            </p>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {product.discount && (
              <span className="text-green-600 font-semibold text-sm">
                Save ₹{(product.originalPrice! - product.price).toLocaleString()}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button 
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!product.inStock}
          >
            <ShoppingCart className="w-4 h-4" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 via-green-500 to-teal-500 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Ather Accessories
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8">
              Premium accessories designed for your Ather electric scooter
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-green-100">
              <span className="flex items-center gap-2">
                ⚡ Authorized Dealer
              </span>
              <span className="flex items-center gap-2">
                🔧 Expert Installation
              </span>
              <span className="flex items-center gap-2">
                🚚 Fast Delivery
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white shadow-lg border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search accessories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Categories
              </button>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [sort, order] = e.target.value.split('-');
                    setSortBy(sort);
                    setSortOrder(order);
                  }}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:border-green-500 focus:outline-none bg-white"
                >
                  <option value="name-asc">Name A-Z</option>
                  <option value="name-desc">Name Z-A</option>
                  <option value="price-asc">Price Low-High</option>
                  <option value="price-desc">Price High-Low</option>
                  <option value="newest-desc">Newest First</option>
                  <option value="bestseller-desc">Bestsellers</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${
                    viewMode === 'grid'
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${
                    viewMode === 'list'
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Results Summary */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {selectedCategory === 'all' ? 'All Accessories' : 
             categories.find(c => c.id === selectedCategory)?.name || 'Accessories'}
          </h2>
          <p className="text-gray-600">
            {searchTerm ? `Found ${totalProducts} results for "${searchTerm}"` : 
             `${totalProducts} premium accessories available`}
          </p>
        </div>

        {/* Loading State */}
        {loading && products.length === 0 && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mb-4"></div>
              <p className="text-gray-600">Loading accessories...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Failed to load accessories</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => fetchProducts(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No accessories found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && products.length > 0 && (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!loading && hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={loadMore}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              Load More Accessories
            </button>
          </div>
        )}

        {/* Loading More Indicator */}
        {loading && products.length > 0 && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Raam Ather Accessories?</h2>
            <p className="text-xl text-gray-600">Premium quality, perfect compatibility, unmatched service</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Perfect Compatibility</h3>
              <p className="text-gray-600">All accessories designed specifically for Ather electric scooters</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick delivery across Hyderabad and Chennai with installation support</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Premium Quality</h3>
              <p className="text-gray-600">Genuine Ather accessories with manufacturer warranty</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Choosing Accessories?</h2>
          <p className="text-xl mb-8 text-green-100">
            Our experts are here to help you find the perfect accessories for your Ather
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-green-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
              Contact Expert
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white hover:text-green-600 transition-colors">
              Visit Showroom
            </button>
          </div>
          
          <div className="mt-8 text-green-100 space-y-1">
            <p>📍 Available in Hyderabad & Chennai</p>
            <p>🔒 Secure Online Payment</p>
            <p>🛡️ Manufacturer Warranty</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtherAccessoriesPage;