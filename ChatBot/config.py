# Configuration settings
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Config:
    """Configuration class for the learning chatbot"""
    
    # Flask configuration
    SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key-here')
    DEBUG = os.getenv('DEBUG', 'True').lower() == 'true'
    
    # API Configuration
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
    
    # Database configuration (if using database)
    DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///chatbot.db')
    
    # Learning Bot Configuration
    MAX_CONVERSATION_HISTORY = int(os.getenv('MAX_CONVERSATION_HISTORY', '100'))
    DEFAULT_DIFFICULTY_LEVEL = os.getenv('DEFAULT_DIFFICULTY_LEVEL', 'beginner')
    DEFAULT_LEARNING_STYLE = os.getenv('DEFAULT_LEARNING_STYLE', 'visual')
    
    # Rate limiting
    RATE_LIMIT_PER_MINUTE = int(os.getenv('RATE_LIMIT_PER_MINUTE', '30'))
    
    # File storage paths
    USER_PROFILES_DIR = os.getenv('USER_PROFILES_DIR', 'user_profiles')
    ANALYTICS_DIR = os.getenv('ANALYTICS_DIR', 'analytics')
    
    # Learning categories
    LEARNING_CATEGORIES = [
        'programming',
        'mathematics',
        'science',
        'language',
        'history',
        'art',
        'music',
        'business',
        'technology',
        'other'
    ]
    
    # Learning styles
    LEARNING_STYLES = [
        'visual',      # Learn through images, diagrams, charts
        'auditory',    # Learn through listening and discussion
        'kinesthetic', # Learn through hands-on activities
        'reading',     # Learn through reading and writing
        'mixed'        # Combination of styles
    ]
    
    # Difficulty levels
    DIFFICULTY_LEVELS = [
        'beginner',
        'intermediate',
        'advanced',
        'expert'
    ]
    
    @staticmethod
    def validate_config():
        """Validate that required configuration is present"""
        required_vars = ['GEMINI_API_KEY']
        missing_vars = []
        
        for var in required_vars:
            if not os.getenv(var):
                missing_vars.append(var)
        
        if missing_vars:
            raise ValueError(f"Missing required environment variables: {', '.join(missing_vars)}")
        
        return True

# Ensure directories exist
os.makedirs(Config.USER_PROFILES_DIR, exist_ok=True)
os.makedirs(Config.ANALYTICS_DIR, exist_ok=True)


