# Learning analytics logic
import json
import os
from datetime import datetime, timedelta
from collections import defaultdict, Counter
from config import Config

class LearningAnalytics:
    """Analytics engine for tracking learning patterns and insights"""
    
    def __init__(self):
        self.analytics_file = os.path.join(Config.ANALYTICS_DIR, 'analytics.json')
        self.user_analytics = defaultdict(lambda: {
            'interactions': [],
            'topics': defaultdict(int),
            'session_times': [],
            'difficulty_progression': [],
            'engagement_patterns': defaultdict(list),
            'learning_outcomes': []
        })
        self.load_analytics()
    
    def load_analytics(self):
        """Load analytics data from file"""
        try:
            if os.path.exists(self.analytics_file):
                with open(self.analytics_file, 'r') as f:
                    data = json.load(f)
                    for user_id, analytics in data.items():
                        self.user_analytics[user_id] = analytics
        except Exception as e:
            print(f"Error loading analytics: {e}")
    
    def save_analytics(self):
        """Save analytics data to file"""
        try:
            # Convert defaultdict to regular dict for JSON serialization
            analytics_data = {}
            for user_id, analytics in self.user_analytics.items():
                analytics_data[user_id] = dict(analytics)
                # Convert nested defaultdicts
                for key, value in analytics_data[user_id].items():
                    if isinstance(value, defaultdict):
                        analytics_data[user_id][key] = dict(value)
            
            with open(self.analytics_file, 'w') as f:
                json.dump(analytics_data, f, indent=2, default=str)
        except Exception as e:
            print(f"Error saving analytics: {e}")
    
    def track_interaction(self, user_id, user_message, bot_response):
        """Track a user interaction for analytics"""
        timestamp = datetime.now().isoformat()
        
        interaction_data = {
            'timestamp': timestamp,
            'user_message_length': len(user_message),
            'bot_response_length': len(bot_response),
            'contains_question': '?' in user_message,
            'contains_code': any(keyword in user_message.lower() for keyword in ['code', 'function', 'class', 'def', 'import']),
            'sentiment': self.analyze_sentiment(user_message),
            'complexity_level': self.estimate_complexity(user_message, bot_response)
        }
        
        self.user_analytics[user_id]['interactions'].append(interaction_data)
        
        # Extract and track topics
        topics = self.extract_topics(user_message + " " + bot_response)
        for topic in topics:
            self.user_analytics[user_id]['topics'][topic] += 1
        
        # Track engagement patterns
        hour = datetime.now().hour
        self.user_analytics[user_id]['engagement_patterns'][str(hour)].append(timestamp)
        
        # Limit stored interactions to prevent file size issues
        if len(self.user_analytics[user_id]['interactions']) > Config.MAX_CONVERSATION_HISTORY:
            self.user_analytics[user_id]['interactions'] = self.user_analytics[user_id]['interactions'][-Config.MAX_CONVERSATION_HISTORY:]
        
        self.save_analytics()
    
    def analyze_sentiment(self, text):
        """Simple sentiment analysis"""
        positive_words = ['good', 'great', 'excellent', 'amazing', 'helpful', 'clear', 'understand', 'love', 'like']
        negative_words = ['bad', 'terrible', 'confusing', 'difficult', 'hate', 'unclear', 'frustrated', 'confused']
        
        text_lower = text.lower()
        positive_count = sum(1 for word in positive_words if word in text_lower)
        negative_count = sum(1 for word in negative_words if word in text_lower)
        
        if positive_count > negative_count:
            return 'positive'
        elif negative_count > positive_count:
            return 'negative'
        else:
            return 'neutral'
    
    def estimate_complexity(self, user_message, bot_response):
        """Estimate the complexity level of the interaction"""
        # Simple heuristic based on message length and technical terms
        technical_terms = ['algorithm', 'function', 'variable', 'loop', 'condition', 'class', 'method', 'object']
        
        combined_text = (user_message + " " + bot_response).lower()
        technical_count = sum(1 for term in technical_terms if term in combined_text)
        
        total_length = len(user_message) + len(bot_response)
        
        if technical_count >= 3 or total_length > 1000:
            return 'high'
        elif technical_count >= 1 or total_length > 300:
            return 'medium'
        else:
            return 'low'
    
    def extract_topics(self, text):
        """Extract topics from conversation text"""
        topics = []
        text_lower = text.lower()
        
        topic_keywords = {
            'programming': ['code', 'python', 'javascript', 'programming', 'algorithm', 'function', 'variable', 'loop'],
            'web_development': ['html', 'css', 'javascript', 'react', 'node', 'frontend', 'backend', 'api'],
            'data_science': ['data', 'analysis', 'pandas', 'numpy', 'machine learning', 'statistics'],
            'mathematics': ['math', 'equation', 'calculate', 'number', 'algebra', 'geometry', 'calculus'],
            'science': ['science', 'experiment', 'theory', 'physics', 'chemistry', 'biology'],
            'language_learning': ['language', 'grammar', 'vocabulary', 'translation', 'pronunciation'],
            'history': ['history', 'historical', 'ancient', 'century', 'civilization', 'culture'],
            'business': ['business', 'management', 'marketing', 'finance', 'strategy', 'economics'],
            'technology': ['technology', 'computer', 'internet', 'digital', 'AI', 'software', 'hardware'],
            'art_design': ['art', 'design', 'creative', 'drawing', 'painting', 'graphic', 'visual']
        }
        
        for topic, keywords in topic_keywords.items():
            if any(keyword in text_lower for keyword in keywords):
                topics.append(topic)
        
        return topics
    
    def get_user_analytics(self, user_id):
        """Get comprehensive analytics for a specific user"""
        if user_id not in self.user_analytics:
            return {'error': 'No analytics data found for user'}
        
        user_data = self.user_analytics[user_id]
        interactions = user_data['interactions']
        
        if not interactions:
            return {'message': 'No interactions recorded yet'}
        
        # Calculate metrics
        total_interactions = len(interactions)
        avg_message_length = sum(i['user_message_length'] for i in interactions) / total_interactions
        question_ratio = sum(1 for i in interactions if i['contains_question']) / total_interactions
        
        # Sentiment analysis
        sentiment_counts = Counter(i['sentiment'] for i in interactions)
        
        # Complexity distribution
        complexity_counts = Counter(i['complexity_level'] for i in interactions)
        
        # Topic analysis
        top_topics = dict(Counter(user_data['topics']).most_common(10))
        
        # Engagement patterns (by hour)
        engagement_by_hour = {}
        for hour, timestamps in user_data['engagement_patterns'].items():
            engagement_by_hour[hour] = len(timestamps)
        
        # Learning progression
        recent_interactions = interactions[-20:] if len(interactions) >= 20 else interactions
        complexity_trend = [i['complexity_level'] for i in recent_interactions]
        
        # Activity patterns
        if len(interactions) >= 2:
            first_interaction = datetime.fromisoformat(interactions[0]['timestamp'])
            last_interaction = datetime.fromisoformat(interactions[-1]['timestamp'])
            total_days = (last_interaction - first_interaction).days or 1
            avg_interactions_per_day = total_interactions / total_days
        else:
            avg_interactions_per_day = 1
        
        return {
            'user_id': user_id,
            'summary': {
                'total_interactions': total_interactions,
                'avg_message_length': round(avg_message_length, 2),
                'question_ratio': round(question_ratio * 100, 2),
                'avg_interactions_per_day': round(avg_interactions_per_day, 2)
            },
            'sentiment_analysis': dict(sentiment_counts),
            'complexity_distribution': dict(complexity_counts),
            'top_topics': top_topics,
            'engagement_by_hour': engagement_by_hour,
            'learning_progression': {
                'complexity_trend': complexity_trend,
                'recent_topics': list(Counter([topic for topic in user_data['topics'] if user_data['topics'][topic] > 0]).keys())[-10:]
            },
            'insights': self.generate_insights(user_id)
        }
    
    def generate_insights(self, user_id):
        """Generate learning insights for a user"""
        insights = []
        user_data = self.user_analytics[user_id]
        interactions = user_data['interactions']
        
        if not interactions:
            return insights
        
        # Engagement insight
        question_ratio = sum(1 for i in interactions if i['contains_question']) / len(interactions)
        if question_ratio > 0.5:
            insights.append("High curiosity level - asks many questions")
        elif question_ratio < 0.2:
            insights.append("Could benefit from asking more questions")
        
        # Complexity progression
        recent_complexity = [i['complexity_level'] for i in interactions[-10:]]
        if len(recent_complexity) >= 5:
            if recent_complexity[-1] == 'high' and recent_complexity[0] == 'low':
                insights.append("Great progression from basic to advanced concepts")
            elif all(c == 'low' for c in recent_complexity):
                insights.append("Ready to tackle more challenging topics")
        
        # Topic diversity
        unique_topics = len(set(user_data['topics'].keys()))
        if unique_topics > 5:
            insights.append("Excellent topic diversity - well-rounded learner")
        elif unique_topics < 3:
            insights.append("Consider exploring more diverse topics")
        
        # Engagement patterns
        engagement_hours = user_data['engagement_patterns']
        if engagement_hours:
            peak_hour = max(engagement_hours.keys(), key=lambda x: len(engagement_hours[x]))
            insights.append(f"Most active during hour {peak_hour}")
        
        # Sentiment trends
        recent_sentiment = [i['sentiment'] for i in interactions[-10:]]
        positive_ratio = recent_sentiment.count('positive') / len(recent_sentiment)
        if positive_ratio > 0.7:
            insights.append("Positive learning experience - high satisfaction")
        elif positive_ratio < 0.3:
            insights.append("May need more encouragement and support")
        
        return insights
    
    def get_global_analytics(self):
        """Get system-wide analytics across all users"""
        total_users = len(self.user_analytics)
        total_interactions = sum(len(data['interactions']) for data in self.user_analytics.values())
        
        # Aggregate topic popularity
        global_topics = defaultdict(int)
        for user_data in self.user_analytics.values():
            for topic, count in user_data['topics'].items():
                global_topics[topic] += count
        
        return {
            'total_users': total_users,
            'total_interactions': total_interactions,
            'popular_topics': dict(Counter(global_topics).most_common(10)),
            'avg_interactions_per_user': round(total_interactions / max(total_users, 1), 2)
        }