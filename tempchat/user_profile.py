# User profile management
import json
import os
from datetime import datetime, timedelta
from collections import defaultdict, Counter
from config import Config

class UserProfile:
    """Manages individual user learning profiles and personalization"""
    
    def __init__(self, user_id):
        self.user_id = user_id
        self.profile_file = os.path.join(Config.USER_PROFILES_DIR, f"{user_id}.json")
        
        # Default profile data
        self.learning_style = Config.DEFAULT_LEARNING_STYLE
        self.difficulty_level = Config.DEFAULT_DIFFICULTY_LEVEL
        self.interests = []
        self.learning_goals = []
        self.recent_topics = []
        self.interaction_count = 0
        self.total_time_spent = 0
        self.preferred_language = 'english'
        self.timezone = 'UTC'
        
        # Learning analytics
        self.topic_frequency = defaultdict(int)
        self.difficulty_progress = defaultdict(int)
        self.session_history = []
        self.learning_streaks = 0
        self.last_active = None
        self.created_at = datetime.now().isoformat()
        
        # Performance tracking
        self.understanding_scores = []
        self.completion_rates = []
        self.engagement_metrics = {
            'questions_asked': 0,
            'follow_ups': 0,
            'topics_explored': 0
        }
        
        # Load existing profile if available
        self.load_profile()
    
    def load_profile(self):
        """Load user profile from file"""
        try:
            if os.path.exists(self.profile_file):
                with open(self.profile_file, 'r') as f:
                    data = json.load(f)
                    self.__dict__.update(data)
        except Exception as e:
            print(f"Error loading profile for {self.user_id}: {e}")
    
    def save_profile(self):
        """Save user profile to file"""
        try:
            profile_data = self.__dict__.copy()
            # Remove non-serializable objects
            profile_data.pop('profile_file', None)
            
            with open(self.profile_file, 'w') as f:
                json.dump(profile_data, f, indent=2, default=str)
        except Exception as e:
            print(f"Error saving profile for {self.user_id}: {e}")
    
    def update_activity(self):
        """Update user activity metrics"""
        now = datetime.now()
        self.last_active = now.isoformat()
        self.interaction_count += 1
        
        # Update learning streak
        if self.session_history:
            last_session = datetime.fromisoformat(self.session_history[-1]['timestamp'])
            if (now - last_session).days == 1:
                self.learning_streaks += 1
            elif (now - last_session).days > 1:
                self.learning_streaks = 1
        else:
            self.learning_streaks = 1
        
        # Add session
        self.session_history.append({
            'timestamp': now.isoformat(),
            'session_id': len(self.session_history) + 1
        })
        
        # Keep only recent sessions
        if len(self.session_history) > Config.MAX_CONVERSATION_HISTORY:
            self.session_history = self.session_history[-Config.MAX_CONVERSATION_HISTORY:]
        
        self.save_profile()
    
    def add_interaction(self, user_message, bot_response):
        """Process and learn from user interaction"""
        # Extract topics from the interaction
        topics = self.extract_topics(user_message + " " + bot_response)
        
        for topic in topics:
            self.topic_frequency[topic] += 1
            if topic not in self.recent_topics:
                self.recent_topics.append(topic)
        
        # Keep only recent topics
        if len(self.recent_topics) > 20:
            self.recent_topics = self.recent_topics[-20:]
        
        # Update engagement metrics
        if '?' in user_message:
            self.engagement_metrics['questions_asked'] += 1
        
        # Estimate understanding based on response patterns
        understanding_score = self.estimate_understanding(user_message, bot_response)
        self.understanding_scores.append(understanding_score)
        
        # Keep only recent scores
        if len(self.understanding_scores) > 50:
            self.understanding_scores = self.understanding_scores[-50:]
        
        self.save_profile()
    
    def extract_topics(self, text):
        """Simple topic extraction from conversation text"""
        # This is a basic implementation - could be enhanced with NLP libraries
        topics = []
        text_lower = text.lower()
        
        # Common learning topics keywords
        topic_keywords = {
            'programming': ['code', 'python', 'javascript', 'programming', 'algorithm', 'function'],
            'mathematics': ['math', 'equation', 'calculate', 'number', 'algebra', 'geometry'],
            'science': ['science', 'experiment', 'theory', 'physics', 'chemistry', 'biology'],
            'language': ['language', 'grammar', 'vocabulary', 'translation', 'pronunciation'],
            'history': ['history', 'historical', 'ancient', 'century', 'civilization'],
            'technology': ['technology', 'computer', 'internet', 'digital', 'AI', 'machine learning']
        }
        
        for topic, keywords in topic_keywords.items():
            if any(keyword in text_lower for keyword in keywords):
                topics.append(topic)
        
        return topics
    
    def estimate_understanding(self, user_message, bot_response):
        """Estimate user understanding based on interaction patterns"""
        score = 5.0  # Base score
        
        # Positive indicators
        if any(word in user_message.lower() for word in ['understand', 'got it', 'makes sense', 'clear']):
            score += 2.0
        
        if '?' in user_message:  # Asking questions is good
            score += 1.0
        
        if len(user_message.split()) > 10:  # Detailed responses
            score += 1.0
        
        # Negative indicators
        if any(word in user_message.lower() for word in ['confused', 'dont understand', "don't get"]):
            score -= 2.0
        
        if user_message.lower() in ['ok', 'yes', 'no']:  # Very short responses
            score -= 1.0
        
        return max(1.0, min(10.0, score))  # Clamp between 1-10
    
    def get_learning_recommendations(self):
        """Generate personalized learning recommendations"""
        recommendations = []
        
        # Based on interests
        for interest in self.interests[:3]:
            recommendations.append(f"Explore advanced topics in {interest}")
        
        # Based on recent topics
        if self.recent_topics:
            most_frequent = Counter(self.recent_topics).most_common(1)[0][0]
            recommendations.append(f"Deep dive into {most_frequent} concepts")
        
        # Based on difficulty level
        if self.difficulty_level == 'beginner':
            recommendations.append("Try some intermediate-level challenges")
        elif self.difficulty_level == 'advanced':
            recommendations.append("Consider teaching or mentoring others")
        
        return recommendations
    
    def get_progress_stats(self):
        """Get user's learning progress statistics"""
        avg_understanding = sum(self.understanding_scores) / len(self.understanding_scores) if self.understanding_scores else 5.0
        
        return {
            'total_interactions': self.interaction_count,
            'learning_streak': self.learning_streaks,
            'topics_explored': len(set(self.recent_topics)),
            'average_understanding': round(avg_understanding, 2),
            'engagement_score': self.calculate_engagement_score(),
            'recommendations': self.get_learning_recommendations()
        }
    
    def calculate_engagement_score(self):
        """Calculate overall engagement score"""
        if self.interaction_count == 0:
            return 0
        
        # Factors for engagement
        question_ratio = self.engagement_metrics['questions_asked'] / self.interaction_count
        topic_diversity = len(set(self.recent_topics)) / max(len(self.recent_topics), 1)
        consistency = min(self.learning_streaks / 7, 1.0)  # Weekly consistency
        
        engagement_score = (question_ratio * 30 + topic_diversity * 40 + consistency * 30)
        return min(100, max(0, round(engagement_score)))
    
    def adapt_difficulty(self):
        """Suggest difficulty level adaptation based on performance"""
        if len(self.understanding_scores) < 5:
            return self.difficulty_level
        
        recent_avg = sum(self.understanding_scores[-10:]) / min(10, len(self.understanding_scores))
        
        if recent_avg > 8.0 and self.difficulty_level != 'expert':
            levels = Config.DIFFICULTY_LEVELS
            current_index = levels.index(self.difficulty_level)
            if current_index < len(levels) - 1:
                return levels[current_index + 1]
        elif recent_avg < 4.0 and self.difficulty_level != 'beginner':
            levels = Config.DIFFICULTY_LEVELS
            current_index = levels.index(self.difficulty_level)
            if current_index > 0:
                return levels[current_index - 1]
        
        return self.difficulty_level
    
    def to_dict(self):
        """Convert profile to dictionary for API responses"""
        return {
            'user_id': self.user_id,
            'learning_style': self.learning_style,
            'difficulty_level': self.difficulty_level,
            'interests': self.interests,
            'learning_goals': self.learning_goals,
            'recent_topics': self.recent_topics[-10:],  # Last 10 topics
            'progress_stats': self.get_progress_stats(),
            'suggested_difficulty': self.adapt_difficulty(),
            'last_active': self.last_active,
            'created_at': self.created_at
        }
    
    @property
    def progress_summary(self):
        """Get a summary of user's learning progress"""
        if self.interaction_count == 0:
            return "Just getting started!"
        
        avg_understanding = sum(self.understanding_scores) / len(self.understanding_scores) if self.understanding_scores else 5.0
        
        if avg_understanding >= 8:
            return f"Excellent progress! {self.interaction_count} interactions with high understanding."
        elif avg_understanding >= 6:
            return f"Good progress! {self.interaction_count} interactions with solid understanding."
        else:
            return f"Learning in progress! {self.interaction_count} interactions, focusing on comprehension."

        
