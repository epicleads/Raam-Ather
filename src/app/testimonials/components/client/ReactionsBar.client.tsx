'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ReactionData } from '../../data/testimonials.types';

interface ReactionsBarProps {
  initialReactions?: ReactionData;
  className?: string;
}

export default function ReactionsBar({ 
  initialReactions = { helpful: 127, loved: 89, trusted: 156 },
  className = ''
}: ReactionsBarProps) {
  const [reactions, setReactions] = useState<ReactionData>(initialReactions);
  const [userReactions, setUserReactions] = useState<Set<keyof ReactionData>>(new Set());

  const handleReaction = (type: keyof ReactionData) => {
    const hasReacted = userReactions.has(type);
    
    setReactions(prev => ({
      ...prev,
      [type]: hasReacted ? prev[type] - 1 : prev[type] + 1
    }));

    setUserReactions(prev => {
      const newSet = new Set(prev);
      if (hasReacted) {
        newSet.delete(type);
      } else {
        newSet.add(type);
      }
      return newSet;
    });
  };

  const reactionButtons = [
    {
      type: 'helpful' as const,
      emoji: '⚡',
      label: 'Helpful',
      color: 'from-yellow-500 to-orange-500',
      hoverColor: 'hover:from-yellow-400 hover:to-orange-400'
    },
    {
      type: 'loved' as const,
      emoji: '❤️',
      label: 'Loved It',
      color: 'from-red-500 to-pink-500',
      hoverColor: 'hover:from-red-400 hover:to-pink-400'
    },
    {
      type: 'trusted' as const,
      emoji: '👍',
      label: 'Trusted',
      color: 'from-blue-500 to-indigo-500',
      hoverColor: 'hover:from-blue-400 hover:to-indigo-400'
    }
  ];

  return (
    <section className={`bg-white backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            What do you think about these reviews?
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            Help other riders by sharing your feedback
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          {reactionButtons.map((button, index) => (
            <motion.button
              key={button.type}
              onClick={() => handleReaction(button.type)}
              className={`
                relative group flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl
                bg-gray-50 border-2 transition-all duration-300 w-full sm:w-auto
                ${userReactions.has(button.type)
                  ? `border-transparent bg-gradient-to-r ${button.color} text-white`
                  : `border-gray-200 hover:border-gray-300 ${button.hoverColor}`
                }
              `}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="text-xl sm:text-2xl"
                animate={userReactions.has(button.type) ? {
                  scale: [1, 1.3, 1],
                  rotate: [0, 10, -10, 0]
                } : {}}
                transition={{ duration: 0.6 }}
              >
                {button.emoji}
              </motion.span>
              
              <div className="text-left">
                <div className="font-semibold text-gray-900">
                  {button.label}
                </div>
                <motion.div
                  key={reactions[button.type]}
                  initial={{ scale: 1.2, color: '#00E396' }}
                  animate={{ scale: 1, color: '#6B7280' }}
                  className="text-sm text-gray-500"
                >
                  {reactions[button.type].toLocaleString()}
                </motion.div>
              </div>

              {/* Ripple Effect */}
              {userReactions.has(button.type) && (
                <motion.div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r ${button.color} opacity-20`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Thank You Message */}
        {userReactions.size > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mt-6 p-4 bg-[#00E396]/10 border border-[#00E396]/30 rounded-lg"
          >
                          <p className="text-[#00E396] font-medium">
              Thanks for your feedback! 🎉
            </p>
            <p className="text-gray-600 text-sm mt-1">
              Your reaction helps other riders make better decisions
            </p>
          </motion.div>
        )}

        {/* Total Engagement */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>
            {(reactions.helpful + reactions.loved + reactions.trusted).toLocaleString()} total reactions from the community
          </p>
        </div>
      </div>
    </section>
  );
}