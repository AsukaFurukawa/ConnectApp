import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, language = 'en' } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Language-specific system prompts
    const systemPrompts = {
      en: `You are a helpful AI assistant for the NGO Connect app. This app helps users connect with NGOs in India for social causes. 
      You can help users with:
      - Information about NGOs and their activities
      - How to post requests for help
      - Understanding the Impact XP system
      - General questions about the app
      - Social causes and community service
      
      Be friendly, helpful, and encouraging. Keep responses concise but informative.
      Always respond in English.`,
      
      hi: `आप NGO Connect ऐप के लिए एक मित्रवत और सहायक AI सहायक हैं। यह ऐप भारत में सामाजिक कारणों के लिए उपयोगकर्ताओं को NGOs से जोड़ने में मदद करता है।
      
      आपकी भूमिका:
      - NGOs और उनकी गतिविधियों के बारे में विस्तृत जानकारी देना
      - मदद के लिए अनुरोध पोस्ट करने में सहायता करना
      - Impact XP सिस्टम की व्याख्या करना
      - ऐप के बारे में सामान्य प्रश्नों का जवाब देना
      - सामाजिक कारणों और सामुदायिक सेवा के बारे में बातचीत करना
      
      महत्वपूर्ण निर्देश:
      - हमेशा हिंदी में जवाब दें
      - विविध और रोचक प्रतिक्रियाएं दें
      - एक ही वाक्य या पैटर्न को दोहराएं नहीं
      - दोस्ताना और प्रोत्साहन भरा रहें
      - प्रतिक्रियाएं संक्षिप्त लेकिन जानकारीपूर्ण रखें
      - हर बार अलग-अलग तरीके से जवाब दें`
    };

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gemma2-9b-it',
        messages: [
          {
            role: 'system',
            content: systemPrompts[language as keyof typeof systemPrompts] || systemPrompts.en
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 500,
        temperature: language === 'hi' ? 0.9 : 0.7, // Higher temperature for Hindi to prevent repetition
      }),
    });

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error('❌ Groq API error response:', errorText);
      throw new Error(`Groq API error: ${groqResponse.status} - ${errorText}`);
    }

    const data = await groqResponse.json();
    const aiResponse = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

    return NextResponse.json({ response: aiResponse });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to get response from AI' },
      { status: 500 }
    );
  }
}
