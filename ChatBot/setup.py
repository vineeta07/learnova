
"""
Setup script for the Personalized Learning Chatbot
This script helps you set up the chatbot with proper directory structure and configuration.
"""

import os
import sys
import subprocess
import shutil
from pathlib import Path

def create_directory_structure():
    """Create necessary directories"""
    directories = [
        'templates',
        'static',
        'user_profiles',
        'analytics',
        'logs'
    ]
    
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
        print(f"✓ Created directory: {directory}")

def check_python_version():
    """Check if Python version is compatible"""
    if sys.version_info < (3, 7):
        print("❌ Python 3.7 or higher is required")
        sys.exit(1)
    print(f"✓ Python {sys.version_info.major}.{sys.version_info.minor} detected")

def install_requirements():
    """Install required packages"""
    print("Installing required packages...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✓ All packages installed successfully")
    except subprocess.CalledProcessError:
        print("❌ Failed to install packages. Please run: pip install -r requirements.txt")
        return False
    return True

def create_env_file():
    """Create .env file if it doesn't exist"""
    if not os.path.exists('variables.env'):
        env_content = '''# Personalized Learning Chatbot Environment Variables
GEMINI_API_KEY=your_gemini_api_key_here
SECRET_KEY=your_secret_key_here_change_this_in_production
DEBUG=True

# Optional configurations
MAX_CONVERSATION_HISTORY=100
DEFAULT_DIFFICULTY_LEVEL=beginner
DEFAULT_LEARNING_STYLE=visual
RATE_LIMIT_PER_MINUTE=30
USER_PROFILES_DIR=user_profiles
ANALYTICS_DIR=analytics
'''
        with open('variables.env', 'w') as f:
            f.write(env_content)
        print("✓ Created .env file - AIzaSyAgBWSRm0PzFEQTEcIpcF4sJ8n2dVqzHYY")
    else:
        print("✓ .env file already exists")

def validate_files():
    """Check if all required files exist"""
    required_files = [
        'main.py',
        'config.py',
        'user_profile.py',
        'learning_analytics.py',
        'requirements.txt',
        'index.html'
    ]
    
    missing_files = []
    for file in required_files:
        if not os.path.exists(file):
            missing_files.append(file)
    
    if missing_files:
        print("❌ Missing required files:")
        for file in missing_files:
            print(f"   - {file}")
        return False
    
    print("✓ All required files are present")
    return True

def setup_gitignore():
    """Create .gitignore file"""
    gitignore_content = '''# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Environment
.env
.venv
env/
venv/
ENV/
env.bak/
venv.bak/

# User data
user_profiles/
analytics/
logs/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db
'''
    
    with open('.gitignore', 'w') as f:
        f.write(gitignore_content)
    print("✓ Created .gitignore file")

def print_instructions():
    """Print setup completion instructions"""
    print("\n" + "="*60)
    print("🎉 Setup completed successfully!")
    print("="*60)
    print("\nNext steps:")
    print("1. Add your Gemini API key to the .env file")
    print("   - Get your API key from: https://makersuite.google.com/app/apikey")
    print("   - Replace 'your_gemini_api_key_here' with your actual API key")
    print("\n2. Run the chatbot:")
    print("   python main.py")
    print("\n3. Open your browser and go to:")
    print("   http://localhost:5000")
    print("\n4. Start chatting with your personalized learning assistant!")
    print("\nOptional:")
    print("- Customize learning categories in config.py")
    print("- Modify the frontend design in templates/index.html")
    print("- Add more analytics in learning_analytics.py")
    print("\nFor troubleshooting, check the console output for error messages.")

def main():
    """Main setup function"""
    print("Setting up Personalized Learning Chatbot...")
    print("="*50)
    
    # Check Python version
    check_python_version()
    
    # Create directory structure
    create_directory_structure()
    
    # Validate required files
    if not validate_files():
        print("\n❌ Setup failed: Missing required files")
        print("Please ensure all Python files are in the same directory")
        sys.exit(1)
    
    # Install requirements
    if not install_requirements():
        print("\n⚠️  Package installation failed, but you can install manually")
    
    # Create configuration files
    create_env_file()
    setup_gitignore()
    
    # Print final instructions
    print_instructions()

if __name__ == '__main__':
    main()