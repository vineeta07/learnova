# #!/usr/bin/env python3
# """
# Run script for the Personalized Learning Chatbot
# This script provides a convenient way to start the chatbot with proper error handling.
# """

# import os
# import sys
# import subprocess
# from pathlib import Path

# def check_environment():
#     """Check if the environment is properly set up"""
#     # Check if .env file exists
#     if not os.path.exists('.env'):
#         print("❌ .env file not found!")
#         print("Please run setup.py first or create a .env file with your Gemini API key")
#         return False
    
#     # Check if required directories exist
#     required_dirs = ['templates', 'user_profiles', 'analytics']
#     for directory in required_dirs:
#         if not os.path.exists(directory):
#             print(f"❌ Directory '{directory}' not found!")
#             print("Please run setup.py first")
#             return False
    
#     # Check if Gemini API key is set
#     from dotenv import load_dotenv
#     load_dotenv()
    
#     if not os.getenv('GEMINI_API_KEY') or os.getenv('GEMINI_API_KEY') == 'your_gemini_api_key_here':
#         print("❌ Gemini API key not configured!")
#         print("Please add your Gemini API key to the .env file")
#         print("Get your API key from: https://makersuite.google.com/app/apikey")
#         return False
    
#     return True

# def check_dependencies():
#     """Check if all required packages are installed"""
#     required_packages = [
#         'flask',
#         'flask_cors',
#         'google.generativeai',
#         'python-dotenv'
#     ]
    
#     missing_packages = []
#     for package in required_packages:
#         try:
#             __import__(package.replace('-', '_').replace('.', '_'))
#         except ImportError:
#             missing_packages.append(package)
    
#     if missing_packages:
#         print("❌ Missing required packages:")
#         for package in missing_packages:
#             print(f"   - {package}")
#         print("\nPlease install them using:")
#         print("pip install -r requirements.txt")
#         return False
    
#     return True

# def start_chatbot():
#     """Start the chatbot application"""
#     try:
#         print("🚀 Starting Personalized Learning Chatbot...")
#         print("="*50)
        
#         # Import and validate configuration
#         from config import Config
#         Config.validate_config()
#         print("✓ Configuration validated")
        
#         # Start the Flask app
#         from main import app
#         print("✓ Application loaded")
#         print("\n🌐 Chatbot is running at: http://localhost:5000")
#         print("📱 Access from mobile: http://YOUR_IP:5000")
#         print("\nPress Ctrl+C to stop the server")
#         print("="*50)
        
#         app.run(
#             host='0.0.0.0',
#             port=5000,
#             debug=os.getenv('DEBUG', 'True').lower() == 'true'
#         )
        
#     except KeyboardInterrupt:
#         print("\n\n👋 Chatbot stopped by user")
#     except Exception as e:
#         print(f"\n❌ Error starting chatbot: {e}")
#         print("\nTroubleshooting tips:")
#         print("1. Check if port 5000 is already in use")
#         print("2. Verify your Gemini API key is correct")
#         print("3. Ensure all required files are present")
#         print("4. Check the console for detailed error messages")

# def main():
#     """Main function"""
#     print("Personalized Learning Chatbot")
#     print("="*40)
    
#     # Check environment setup
#     if not check_environment():
#         print("\n🔧 Run 'python setup.py' to set up the environment")
#         sys.exit(1)
    
#     # Check dependencies
#     if not check_dependencies():
#         sys.exit(1)
    
#     print("✓ Environment check passed")
    
#     # Start


#!/usr/bin/env python3




# """
# Run script for the Personalized Learning Chatbot
# This script provides a convenient way to start the chatbot with proper error handling.
# """

# import os
# import sys
# from dotenv import load_dotenv
# from pathlib import Path

# def check_environment():
#     """Check if the environment is properly set up"""
#     if not os.path.exists('.env'):
#         print("❌ .env file not found! Run 'python setup.py' to create it.")
#         return False

#     required_dirs = ['templates', 'user_profiles', 'analytics']
#     for directory in required_dirs:
#         if not os.path.isdir(directory):
#             print(f"❌ Missing directory: {directory}. Run 'python setup.py' first.")
#             return False

#     load_dotenv()
#     api_key = os.getenv('GEMINI_API_KEY')
#     if not api_key or api_key == 'your_gemini_api_key_here':
#         print("❌ Gemini API key not set in .env file.")
#         return False

#     return True

# def check_dependencies():
#     """Ensure all required packages are installed"""
#     try:
#         import flask
#         import flask_cors
#         import google.generativeai
#         import dotenv
#         return True
#     except ImportError as e:
#         print(f"❌ Missing dependency: {e.name}")
#         print("Please install all packages using:")
#         print("   pip install -r requirements.txt")
#         return False

# def start_chatbot():
#     """Start the chatbot application"""
#     try:
#         from config import Config
#         Config.validate_config()
          
#         from main import app
#         print("\n🚀 Starting the chatbot on http://localhost:5000 ...")
#         app.run(host='0.0.0.0', port=5000, debug=os.getenv('DEBUG', 'True').lower() == 'true')

#     except Exception as e:
#         print(f"\n❌ Error starting the chatbot: {e}")
#         print("Check your files, API key, and debug messages for details.")

# def main():
#     print("🧠 Personalized Learning Chatbot Launcher")
#     print("=" * 40)

#     if not check_environment():
#         sys.exit(1)

#     if not check_dependencies():
#         sys.exit(1)

#     start_chatbot()

# if __name__ == "__main__":
#     main()


#!/usr/bin/env python3
"""
Run script for the Personalized Learning Chatbot
This script provides a convenient way to start the chatbot with proper error handling.
"""

import os
import sys
from dotenv import load_dotenv
from pathlib import Path

def check_environment():
    """Check if the environment is properly set up"""
    if not os.path.exists('variables.env'):
        print("❌ variables.env file not found! Run 'python setup.py' to create it.")
        return False

    required_dirs = ['templates', 'user_profiles', 'analytics']
    for directory in required_dirs:
        if not os.path.isdir(directory):
            print(f"❌ Missing directory: {directory}. Run 'python setup.py' first.")
            return False

    load_dotenv(dotenv_path='variables.env')
    api_key = os.getenv('GEMINI_API_KEY')
    print(api_key)
    if not api_key or api_key == 'AIzaSyA84lfgvp0sd7gxtpeRFqq1lJhyl_ZYzSQ  ':
        print("❌ Gemini API key not set or is a placeholder in variables.env.")
        return False

    return True

def check_dependencies():
    """Ensure all required packages are installed"""
    try:
        import flask
        import flask_cors
        import google.generativeai
        import dotenv
        return True
    except ImportError as e:
        print(f"❌ Missing dependency: {e.name}")
        print("Please install all packages using:")
        print("   pip install -r requirements.txt")
        return False

def start_chatbot():
    """Start the chatbot application"""
    try:
        from config import Config
        Config.validate_config()
        
        from main import app
        print("\n🚀 Starting the chatbot on http://localhost:5000 ...")
        app.run(host='0.0.0.0', port=5000, debug=os.getenv('DEBUG', 'True').lower() == 'true')

    except Exception as e:
        print(f"\n❌ Error starting the chatbot: {e}")
        print("Check your files, API key, and debug messages for details.")

def main():
    print("🧠 Personalized Learning Chatbot Launcher")
    print("=" * 40)

    if not check_environment():
        sys.exit(1)

    if not check_dependencies():
        sys.exit(1)

    start_chatbot()

if __name__ == "__main__":
    main()
