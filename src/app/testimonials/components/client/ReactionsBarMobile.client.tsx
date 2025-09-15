'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ThumbsUp, MessageCircle, Share2, Star } from 'lucide-react';

export default function ReactionsBarMobile() {
  const [reactions, setReactions] = useState({
    likes: 1247,
    loves: 892,
    comments: 156,
    shares: 89,
    ratings: 4.8
  });

  const [userReactions, setUserReactions] = useState({
    liked: false,
    loved: false,
    commented: false,
    shared: false,
    rated: false
  });

  const handleReaction = (type: keyof typeof userReactions) => {
    setUserReactions(prev => {
      const newState = { ...prev, [type]: !prev[type] };
      
      // Update reaction counts
      if (type === 'liked') {
        setReactions(prevReactions => ({
          ...prevReactions,
          likes: prevReactions.likes + (newState.liked ? 1 : -1)
        }));
      } else if (type === 'loved') {
        setReactions(prevReactions => ({
          ...prevReactions,
          loves: prevReactions.loves + (newState.loved ? 1 : -1)
        }));
      }
      
      return newState;
    });
  };

  const reactionButtons = [
    {
      type: 'liked' as keyof typeof userReactions,
      icon: ThumbsUp,
      label: 'Like',
      count: reactions.likes,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      type: 'loved' as keyof typeof userReactions,
      icon: Heart,
      label: 'Love',
      count: reactions.loves,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      type: 'commented' as keyof typeof userReactions,
      icon: MessageCircle,
      label: 'Comment',
      count: reactions.comments,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      type: 'shared' as keyof typeof userReactions,
      icon: Share2,
      label: 'Share',
      count: reactions.shares,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      type: 'rated' as keyof typeof userReactions,
      icon: Star,
      label: 'Rate',
      count: reactions.ratings,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    }
  ];

  return (
    <section className="px-4 py-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Community Reactions
          </h3>
          <p className="text-sm text-gray-600">
            Join the conversation and share your thoughts
          </p>
        </div>

        {/* Reaction Buttons - Vertically Stacked for Mobile */}
        <div className="space-y-3">
          {reactionButtons.map((reaction) => {
            const Icon = reaction.icon;
            const isActive = userReactions[reaction.type];
            
            return (
              <motion.button
                key={reaction.type}
                onClick={() => handleReaction(reaction.type)}
                className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all duration-200 min-h-[44px] ${
                  isActive
                    ? `${reaction.bgColor} ${reaction.borderColor} ${reaction.color}`
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <Icon 
                    size={20} 
                    className={isActive ? reaction.color : 'text-gray-500'} 
                  />
                  <span className="font-medium">{reaction.label}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">
                    {reaction.type === 'rated' ? reactions.ratings : reaction.count}
                  </span>
                  {reaction.type === 'rated' && (
                    <span className="text-xs text-gray-500">/5</span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Community Stats */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-[#00E396]">
                {reactions.likes + reactions.loves}
              </div>
              <div className="text-xs text-gray-600">Total Reactions</div>
            </div>
            <div>
              <div className="text-lg font-bold text-[#00E396]">
                {reactions.comments}
              </div>
              <div className="text-xs text-gray-600">Comments</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-3">
            Share your Ather experience and get featured!
          </p>
          <motion.button
            className="bg-[#00E396] text-black px-6 py-3 rounded-lg font-semibold transition-all hover:bg-[#00E396]/90 min-h-[44px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Share Your Story
          </motion.button>
        </div>
      </div>
    </section>
  );
}
