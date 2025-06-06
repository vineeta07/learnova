# Entry point for the chatbot application
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import google.generativeai as genai
import json
import os
from datetime import datetime
from config import Config
from user_profile import UserProfile
from learning_analytics import LearningAnalytics

from dotenv import load_dotenv
load_dotenv("variables.env")

# Initialize Flask app
app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

# Configure Gemini API
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
model = genai.GenerativeModel('gemini-1.5-flash')

# Initialize components
user_profiles = {}
analytics = LearningAnalytics()

class PersonalizedLearningBot:
    def __init__(self):
        self.conversation_history = {}
    
    def get_user_profile(self, user_id):
        if user_id not in user_profiles:
            user_profiles[user_id] = UserProfile(user_id)
        return user_profiles[user_id]
    
    def generate_personalized_prompt(self, user_profile, message):
        """Generate a personalized prompt based on user's learning profile"""
        prompt = f"""
        You are a personalized learning assistant. Here's the user's learning profile:
        
        Learning Style: {user_profile.learning_style}
        Difficulty Level: {user_profile.difficulty_level}
        Interests: {', '.join(user_profile.interests)}
        Learning Goals: {', '.join(user_profile.learning_goals)}
        Progress: {user_profile.progress_summary}
        
        Recent Topics Discussed: {', '.join(user_profile.recent_topics[-5:])}
        
        Instructions:
        1. Adapt your teaching style to match their learning preference
        2. Adjust complexity based on their difficulty level
        3. Connect new concepts to their interests when possible
        4. Build upon their previous learning
        5. Provide examples relevant to their goals
        6. Ask follow-up questions to ensure understanding
        
        User Message: {message}
        
        Provide a helpful, personalized response that advances their learning.
        """
        return prompt
    
    # def get_response(self, user_id, message):
    #     try:
    #         # Get or create user profile
    #         user_profile = self.get_user_profile(user_id)
            
    #         # Update user activity
    #         user_profile.update_activity()
            
    #         # Generate personalized prompt
    #         personalized_prompt = self.generate_personalized_prompt(user_profile, message)
            
    #         # Get response from Gemini
    #         response = model.generate_content(personalized_prompt)
    #         bot_response = response.text
            
    #         # Update conversation history
    #         if user_id not in self.conversation_history:
    #             self.conversation_history[user_id] = []
            
    #         self.conversation_history[user_id].append({
    #             'timestamp': datetime.now().isoformat(),
    #             'user_message': message,
    #             'bot_response': bot_response
    #         })
            
    #         # Update user profile with new interaction
    #         user_profile.add_interaction(message, bot_response)
            
    #         # Track analytics
    #         analytics.track_interaction(user_id, message, bot_response)
            
    #         return {
    #             'success': True,
    #             'response': bot_response,
    #             'learning_progress': user_profile.get_progress_stats()
    #         }
            
    #     except Exception as e:
    #         return {
    #             'success': False,
    #             'error': str(e),
    #             'response': "I'm sorry, I encountered an error. Please try again."
    #         }
    app = Flask(__name__)

def generate_response(prompt):
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Gemini API error: {e}")
        return "⚠️ Error: Could not generate response."

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '')
    print(f"📩 Received message: {user_message}")
    try:
        bot_response = generate_response(user_message)
        print(f"🤖 Responding with: {bot_response}")
        return jsonify({'response': bot_response})
    except Exception as e:
        print(f"❌ Error in /api/chat: {e}")
        return jsonify({'response': "Sorry, I encountered an error. Please try again."})

# Initialize the bot
learning_bot = PersonalizedLearningBot()

@app.route('/')
def index():
    return render_template('index.html')

# @app.route('/api/chat', methods=['POST'])
# def chat():
#     try:
#         data = request.json
#         user_id = data.get('user_id', 'anonymous')
#         message = data.get('message', '')
        
#         if not message:
#             return jsonify({'error': 'Message is required'}), 400
        
#         response = learning_bot.get_response(user_id, message)
#         return jsonify(response)
    
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

@app.route('/api/profile/<user_id>', methods=['GET'])
def get_profile(user_id):
    try:
        user_profile = learning_bot.get_user_profile(user_id)
        return jsonify(user_profile.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/profile/<user_id>', methods=['POST'])
def update_profile(user_id):
    try:
        data = request.json
        user_profile = learning_bot.get_user_profile(user_id)
        
        if 'learning_style' in data:
            user_profile.learning_style = data['learning_style']
        if 'difficulty_level' in data:
            user_profile.difficulty_level = data['difficulty_level']
        if 'interests' in data:
            user_profile.interests = data['interests']
        if 'learning_goals' in data:
            user_profile.learning_goals = data['learning_goals']
        
        user_profile.save_profile()
        return jsonify({'success': True, 'profile': user_profile.to_dict()})
        # return jsonify({'response': response})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/analytics/<user_id>', methods=['GET'])
def get_analytics(user_id):
    try:
        user_analytics = analytics.get_user_analytics(user_id)
        return jsonify(user_analytics)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/history/<user_id>', methods=['GET'])
def get_history(user_id):
    try:
        history = learning_bot.conversation_history.get(user_id, [])
        return jsonify({'history': history})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# @app.route('/api/chat', methods=['POST'])
# def chat():
#     try:
#         data = request.get_json()
#         message = data.get("message", "")

#         # Add this log
#         print("📩 Received message:", message)

#         response = generate_response(message)
#         return jsonify({"response": response})
    
#     except Exception as e:
#         print("❌ Error in /api/chat:", e)
#         return jsonify({"response": "Sorry, I encountered an error. Please try again."})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)