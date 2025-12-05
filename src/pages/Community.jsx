import { useState } from 'react';
import { Star, MessageCircle, AlertTriangle, Plus, Filter, Edit3 } from 'lucide-react';
import useStore from '../store/useStore';

const Community = () => {
  const { reviews, listings, addReview, currentUser } = useStore();
  const [activeTab, setActiveTab] = useState('reviews');
  const [selectedTag, setSelectedTag] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', contact: '' });
  const [newReview, setNewReview] = useState({ 
    listingId: '', 
    rating: 5, 
    tags: [], 
    comment: '' 
  });
  const [subleaseListings, setSubleaseListings] = useState([
    {
      id: 1,
      title: '急轉！中大後門套房',
      content: '因為要出國交換，急轉中大後門套房，租金8000/月，設備齊全，可立即入住...',
      contact: 'Line ID: student123',
      createdAt: '2024-01-20'
    }
  ]);

  // 獲取所有評價標籤
  const allTags = [...new Set(reviews.flatMap(review => review.tags))];

  // 篩選評價
  const filteredReviews = selectedTag 
    ? reviews.filter(review => review.tags.includes(selectedTag))
    : reviews;

  // 獲取房源名稱
  const getListingTitle = (listingId) => {
    const listing = listings.find(l => l.id === listingId);
    return listing ? listing.title : '未知房源';
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    const post = {
      id: Date.now(),
      ...newPost,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setSubleaseListings(prev => [post, ...prev]);
    setNewPost({ title: '', content: '', contact: '' });
    setShowPostForm(false);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const review = {
      id: Date.now(),
      userId: currentUser.id,
      ...newReview,
      createdAt: new Date().toISOString().split('T')[0]
    };
    addReview(review);
    setNewReview({ listingId: '', rating: 5, tags: [], comment: '' });
    setShowReviewForm(false);
  };

  const toggleReviewTag = (tag) => {
    setNewReview(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const availableTags = ['房東友善', '生活機能佳', '交通便利', '安全', '便宜', '設備新', '管理佳', '室友友善'];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-primary text-white p-4">
        <h1 className="text-xl font-bold flex items-center">
          <MessageCircle className="mr-2" size={24} />
          租屋社群
        </h1>
        <p className="text-sm text-primary-100">分享經驗，互相幫助</p>
      </div>

      {/* 分頁標籤 */}
      <div className="bg-white border-b">
        <div className="flex">
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 py-3 px-4 text-center ${
              activeTab === 'reviews'
                ? 'border-b-2 border-primary text-primary font-medium'
                : 'text-gray-600'
            }`}
          >
            評價牆
          </button>
          <button
            onClick={() => setActiveTab('sublease')}
            className={`flex-1 py-3 px-4 text-center ${
              activeTab === 'sublease'
                ? 'border-b-2 border-primary text-primary font-medium'
                : 'text-gray-600'
            }`}
          >
            轉租專區
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'reviews' ? (
          <>
            {/* 標籤篩選 */}
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Filter size={16} className="mr-2 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">篩選標籤</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag('')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedTag === ''
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  全部
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedTag === tag
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* 新增評價按鈕 */}
            <div className="mb-4 flex justify-end">
              <button
                onClick={() => setShowReviewForm(true)}
                className="bg-primary text-white px-4 py-2 rounded-lg flex items-center text-sm"
              >
                <Edit3 size={16} className="mr-1" />
                撰寫評價
              </button>
            </div>

            {/* 新增評價表單 */}
            {showReviewForm && (
              <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <h3 className="font-semibold mb-3">撰寫房源評價</h3>
                <form onSubmit={handleSubmitReview}>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      選擇房源
                    </label>
                    <select
                      value={newReview.listingId}
                      onChange={(e) => setNewReview({...newReview, listingId: parseInt(e.target.value)})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="">請選擇房源</option>
                      {listings.map(listing => (
                        <option key={listing.id} value={listing.id}>{listing.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      評分
                    </label>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(rating => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setNewReview({...newReview, rating})}
                          className={`p-1 ${newReview.rating >= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                          <Star size={20} className="fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      標籤
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map(tag => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleReviewTag(tag)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            newReview.tags.includes(tag)
                              ? 'bg-primary text-white'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      評價內容
                    </label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows="3"
                      placeholder="分享你的租屋經驗..."
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="bg-primary text-white px-4 py-2 rounded-md text-sm"
                    >
                      發布評價
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm"
                    >
                      取消
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* 評價列表 */}
            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-accent">
                        {getListingTitle(review.listingId)}
                      </h3>
                      <div className="flex items-center mt-1">
                        {renderStars(review.rating)}
                        <span className="ml-2 text-sm text-gray-600">
                          {review.createdAt}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {review.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-gray-700 text-sm">{review.comment}</p>
                  
                  <div className="mt-3 flex justify-end">
                    <button className="text-gray-400 hover:text-red-500 text-xs flex items-center">
                      <AlertTriangle size={12} className="mr-1" />
                      檢舉
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* 轉租專區 */}
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-accent">轉租貼文</h2>
              <button
                onClick={() => setShowPostForm(true)}
                className="bg-primary text-white px-4 py-2 rounded-lg flex items-center text-sm"
              >
                <Plus size={16} className="mr-1" />
                發布轉租
              </button>
            </div>

            {/* 發布轉租表單 */}
            {showPostForm && (
              <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <h3 className="font-semibold mb-3">發布轉租資訊</h3>
                <form onSubmit={handleSubmitPost}>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      標題
                    </label>
                    <input
                      type="text"
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="例：急轉！中大附近套房"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      內容描述
                    </label>
                    <textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows="3"
                      placeholder="詳細描述房源狀況、轉租原因等..."
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      聯絡方式
                    </label>
                    <input
                      type="text"
                      value={newPost.contact}
                      onChange={(e) => setNewPost({...newPost, contact: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Line ID 或電話"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="bg-primary text-white px-4 py-2 rounded-md text-sm"
                    >
                      發布
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPostForm(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm"
                    >
                      取消
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* 安全提醒 */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <AlertTriangle className="text-yellow-600 mr-2 mt-1" size={16} />
                <div>
                  <h4 className="font-medium text-yellow-800 mb-1">安全租屋提醒</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• 看房時請找朋友陪同</li>
                    <li>• 簽約前務必確認房東身份</li>
                    <li>• 避免提前匯款或支付訂金</li>
                    <li>• 有疑慮請撥打165反詐騙專線</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 轉租貼文列表 */}
            <div className="space-y-4">
              {subleaseListings.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="font-semibold text-accent mb-2">{post.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{post.content}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>發布時間：{post.createdAt}</span>
                    <span>聯絡：{post.contact}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Community;