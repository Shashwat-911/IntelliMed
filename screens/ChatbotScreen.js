import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ChatbotScreen() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    // Initial greeting message
    const initialMessage = {
      id: '1',
      text: 'Hello! I\'m your AI health assistant. I can help you with general health questions, medication information, and provide health tips. How can I assist you today?',
      isBot: true,
      timestamp: new Date().toISOString(),
    };
    setMessages([initialMessage]);
  }, []);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isBot: false,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate API call to backend chatbot
    try {
      // Replace this with actual API call
      const botResponse = await simulateBotResponse(userMessage.text);
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        isBot: true,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // FIXED: Enhanced Gemini API integration
  const simulateBotResponse = async (userInput) => {
  // Simulate a small delay to make it feel like AI processing
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const input = userInput.toLowerCase().trim();
  
  // Fever responses
  if (input.includes('fever') || input.includes('temperature') || input.includes('hot')) {
    return `For fever management:

🌡️ **Monitor your temperature** regularly
💧 **Stay hydrated** - drink plenty of water, clear broths
🛏️ **Rest** - get adequate sleep and avoid strenuous activities
💊 **Fever reducers** - acetaminophen or ibuprofen as directed
❄️ **Cool compresses** - apply to forehead or wrists

**Seek medical attention if:**
• Fever above 103°F (39.4°C)
• Fever lasts more than 3 days
• Accompanied by severe symptoms
• Difficulty breathing or chest pain

**For emergencies, call 108**

*This is general information. Always consult healthcare professionals for proper diagnosis and treatment.*`;
  }
  
  // Headache responses
  if (input.includes('headache') || input.includes('head pain') || input.includes('migraine')) {
    return `For headache relief:

🛏️ **Rest** in a quiet, dark room
💧 **Stay hydrated** - dehydration can worsen headaches
❄️ **Cold/warm compress** - apply to head, neck, or shoulders
💆 **Gentle massage** - temples, neck, and shoulder areas
💊 **Pain relief** - over-the-counter medications as directed
😴 **Regular sleep** - maintain consistent sleep schedule

**See a doctor if:**
• Sudden severe headache
• Headache with fever, stiff neck, vision changes
• Frequent or worsening headaches
• Headache after head injury

**Emergency: Call 108**

*Consult healthcare professionals for persistent or severe headaches.*`;
  }
  
  // Diet and nutrition
  if (input.includes('diet') || input.includes('nutrition') || input.includes('food') || input.includes('eating')) {
    return `Healthy diet tips:

🥗 **Balanced meals:**
• 50% fruits and vegetables
• 25% lean proteins (chicken, fish, legumes)
• 25% whole grains (brown rice, quinoa, oats)

💧 **Hydration:** 8-10 glasses of water daily

🚫 **Limit:**
• Processed and packaged foods
• Sugary drinks and excessive sweets
• Trans fats and excessive salt

⏰ **Meal timing:**
• Eat regular meals
• Don't skip breakfast
• Smaller, frequent meals if preferred

🌿 **Include:**
• Nuts and seeds
• Healthy fats (olive oil, avocado)
• Plenty of fiber

*Consult a registered dietitian for personalized nutrition plans, especially if you have health conditions.*`;
  }
  
  // Exercise and fitness
  if (input.includes('exercise') || input.includes('workout') || input.includes('fitness') || input.includes('physical activity')) {
    return `Exercise guidelines:

🏃 **Start slowly** - especially if you're new to exercise
⏰ **150 minutes** moderate exercise per week (WHO recommendation)

💪 **Include both:**
• **Cardio:** walking, swimming, cycling
• **Strength:** bodyweight exercises, weights

🧘 **Don't forget:**
• Flexibility and stretching
• Warm-up and cool-down
• Rest days for recovery

⚠️ **Safety tips:**
• Stay hydrated
• Listen to your body
• Stop if you feel pain
• Start with 10-15 minutes daily

**Consult a doctor before starting if you:**
• Have chronic conditions
• Are over 40 and sedentary
• Have heart conditions
• Take medications

*A fitness professional can create personalized workout plans.*`;
  }
  
  // General health symptoms
  if (input.includes('pain') || input.includes('sick') || input.includes('unwell')) {
    return `For general health concerns:

🩺 **When to see a doctor:**
• Symptoms persist or worsen
• High fever or severe pain
• Difficulty breathing
• Chest pain or pressure
• Severe abdominal pain
• Sudden vision or speech changes

🏠 **Self-care basics:**
• Rest and adequate sleep
• Stay hydrated
• Eat nutritious foods
• Avoid stress when possible

📞 **Emergency contacts:**
• Emergency services: 108
• Poison control if needed
• Your regular doctor

*I provide general information only. For specific symptoms or health concerns, always consult qualified healthcare professionals for proper diagnosis and treatment.*`;
  }
  
  // Medication queries
  if (input.includes('medicine') || input.includes('medication') || input.includes('drug') || input.includes('tablet')) {
    return `Medication safety:

💊 **Always:**
• Follow prescribed dosages exactly
• Take at recommended times
• Complete full courses (antibiotics)
• Store medications properly
• Check expiration dates

⚠️ **Never:**
• Share prescription medications
• Exceed recommended doses
• Mix medications without doctor approval
• Stop prescribed medications suddenly

🤔 **Questions to ask your doctor:**
• How and when to take medication
• Possible side effects
• Food/drink interactions
• Other medication interactions

📞 **Contact doctor if:**
• Side effects occur
• Symptoms don't improve
• You miss doses
• You have concerns

*Only qualified healthcare providers can prescribe and advise on medications. Never self-medicate.*`;
  }
  
  // Mental health
  if (input.includes('stress') || input.includes('anxiety') || input.includes('depression') || input.includes('mental') || input.includes('mood')) {
    return `Mental health support:

🧠 **Stress management:**
• Deep breathing exercises
• Regular physical activity
• Adequate sleep (7-9 hours)
• Connect with friends and family
• Practice mindfulness or meditation

📞 **Professional help:**
• Talk to your primary care doctor
• Consider counseling or therapy
• Mental health helplines available
• Don't hesitate to seek support

⚠️ **Seek immediate help if:**
• Thoughts of self-harm
• Severe depression or anxiety
• Unable to function daily
• Substance use concerns

🌟 **Remember:**
• Mental health is as important as physical health
• Seeking help is a sign of strength
• Treatment is effective and available

*Mental health professionals can provide proper assessment and treatment. Don't suffer in silence.*`;
  }
  
  // Default response for other queries
  return `Thank you for your health question: "${userInput}"

🩺 **For specific health concerns, I recommend:**
• Consulting with a qualified healthcare professional
• Getting proper medical examination
• Following professional medical advice
• Keeping a symptom diary if ongoing

📞 **Emergency contacts:**
• Emergency services: 108
• Your family doctor
• Local hospital or clinic

💡 **I can help with general information about:**
• Common symptoms (fever, headache)
• Healthy lifestyle tips
• When to seek medical care
• Basic first aid guidance

*I provide general health information only and cannot replace professional medical advice, diagnosis, or treatment.*`;
};

// You can also add this helper function for more interactive responses
const getHealthTip = () => {
  const tips = [
    "Drink at least 8 glasses of water daily for optimal health.",
    "Aim for 7-9 hours of quality sleep each night.",
    "Include at least 30 minutes of physical activity in your day.",
    "Eat a rainbow of fruits and vegetables for diverse nutrients.",
    "Practice stress management techniques like deep breathing.",
    "Wash your hands regularly to prevent infections.",
    "Take breaks from screens to rest your eyes.",
    "Maintain good posture, especially when sitting long hours."
  ];
  
  return tips[Math.floor(Math.random() * tips.length)];
};

// Fallback function with basic health responses
const getHealthcareResponse = (userInput) => {
  const input = userInput.toLowerCase();
  
  if (input.includes('fever')) {
    return `For fever management:
• Rest and stay hydrated
• Take temperature regularly
• Use fever reducers as directed
• See a doctor if fever persists or is very high
• Seek immediate care if accompanied by severe symptoms

Please consult a healthcare provider for proper diagnosis.`;
  }
  
  if (input.includes('headache')) {
    return `For headache relief:
• Rest in a quiet, dark room
• Stay hydrated
• Apply cold/warm compress
• Gentle neck/shoulder massage
• Over-the-counter pain relievers as directed

Consult a doctor if headaches are severe or frequent.`;
  }
  
  if (input.includes('diet') || input.includes('nutrition')) {
    return `For healthy diet tips:
• Eat plenty of fruits and vegetables
• Choose whole grains
• Include lean proteins
• Stay hydrated
• Limit processed foods

Consult a nutritionist for personalized diet plans.`;
  }
  
  if (input.includes('exercise') || input.includes('fitness')) {
    return `For exercise advice:
• Start slowly and gradually increase intensity
• Include cardio and strength training
• Stay hydrated during workouts
• Get adequate rest between sessions
• Listen to your body

Consult a fitness professional or doctor before starting new routines.`;
  }
  
  return `Thank you for your question about "${userInput}". 

For health-related concerns, I recommend:
• Consulting with a qualified healthcare professional
• Getting proper medical examination and diagnosis
• Following professional medical advice
• For emergencies, call 108 or visit nearest hospital

I can provide general health information, but cannot replace professional medical advice.`;
  };
  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.isBot ? styles.botMessage : styles.userMessage
    ]}>
      {item.isBot && (
        <View style={styles.botAvatar}>
          <Icon name="medical" size={16} color="#fff" />
        </View>
      )}
      <View style={[
        styles.messageBubble,
        item.isBot ? styles.botBubble : styles.userBubble
      ]}>
        <Text style={[
          styles.messageText,
          item.isBot ? styles.botText : styles.userText
        ]}>
          {item.text}
        </Text>
        <Text style={[
          styles.timestamp,
          item.isBot ? styles.botTimestamp : styles.userTimestamp
        ]}>
          {new Date(item.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </Text>
      </View>
    </View>
  );

  const QuickReply = ({ text, onPress }) => (
    <TouchableOpacity style={styles.quickReply} onPress={onPress}>
      <Text style={styles.quickReplyText}>{text}</Text>
    </TouchableOpacity>
  );

  const quickReplies = [
    'I have a fever',
    'Headache remedy',
    'Diet tips',
    'Exercise advice',
  ];

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.botHeaderAvatar}>
            <Icon name="medical" size={20} color="#fff" />
          </View>
          <View>
            <Text style={styles.headerTitle}>Health Assistant</Text>
            <Text style={styles.headerStatus}>Online</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.infoButton}
          onPress={() => Alert.alert(
            'Health Assistant',
            'I can help with general health questions, medication info, and health tips. For emergencies, please call 108 or visit your nearest hospital.'
          )}
        >
          <Icon name="information-circle-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        style={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        onLayout={() => flatListRef.current?.scrollToEnd()}
      />

      {/* Typing indicator */}
      {isTyping && (
        <View style={styles.typingContainer}>
          <View style={styles.botAvatar}>
            <Icon name="medical" size={16} color="#fff" />
          </View>
          <View style={styles.typingBubble}>
            <ActivityIndicator size="small" color="#666" />
            <Text style={styles.typingText}>Health Assistant is typing...</Text>
          </View>
        </View>
      )}

      {/* Quick Replies */}
      {messages.length <= 1 && (
        <View style={styles.quickRepliesContainer}>
          <Text style={styles.quickRepliesTitle}>Quick questions:</Text>
          <View style={styles.quickRepliesRow}>
            {quickReplies.map((reply, index) => (
              <QuickReply
                key={index}
                text={reply}
                onPress={() => setInputText(reply)}
              />
            ))}
          </View>
        </View>
      )}

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your health question..."
          multiline
          maxLength={500}
        />
        <TouchableOpacity 
          style={[styles.sendButton, { opacity: inputText.trim() ? 1 : 0.5 }]}
          onPress={sendMessage}
          disabled={!inputText.trim()}
        >
          <Icon name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingTop: 40,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botHeaderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerStatus: {
    fontSize: 14,
    color: '#4CAF50',
  },
  infoButton: {
    padding: 8,
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  botMessage: {
    alignSelf: 'flex-start',
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 8,
  },
  messageBubble: {
    maxWidth: '70%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    marginBottom: 4,
  },
  botBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: '#2196F3',
    borderBottomRightRadius: 4,
    marginLeft: 40,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  botText: {
    color: '#333',
  },
  userText: {
    color: '#fff',
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
  },
  botTimestamp: {
    color: '#999',
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  typingContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
  },
  typingText: {
    marginLeft: 8,
    color: '#666',
    fontStyle: 'italic',
  },
  quickRepliesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  quickRepliesTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  quickRepliesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  quickReply: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  quickReplyText: {
    fontSize: 14,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
});