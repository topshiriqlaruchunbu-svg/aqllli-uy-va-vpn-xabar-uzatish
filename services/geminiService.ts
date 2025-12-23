
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartHomeAdvice = async (state: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Mening aqlli uyim holati: Harorat ${state.temperature}°C, Chiroqlar ${state.lights ? 'Yoniq' : 'Ochiq'}, Konditsioner ${state.ac ? 'Ishlayapti' : 'Ochiq'}, Xavfsizlik ${state.security ? 'Faol' : 'Ochiq'}. Menga qisqa va professional tizim operatori maslahatini ber. Uzbek tilida bo'lsin.`,
      config: {
        systemInstruction: "Siz aqlli uy boshqaruv tizimi operatorisiz. Tavsiyalar texnik va aniq bo'lsin.",
      }
    });
    return response.text;
  } catch (error) {
    return "Tizim tahlili vaqtinchalik mavjud emas.";
  }
};

export const getSmartCityAdvice = async (state: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Aqlli shahar holati: Svetoforlar ${state.trafficLights ? 'Avtomatik' : 'Manual'}, Ko'cha yoritish ${state.streetLights ? 'Yoniq' : 'Ochiq'}, Energiya yuklamasi ${state.energyGrid}%. Shahar xavfsizligi va resurs tejamkorligi bo'yicha qisqa tavsiya bering. Uzbek tilida.`,
      config: {
        systemInstruction: "Siz aqlli shahar dispetcherisiz. Qisqa va lo'nda javob bering.",
      }
    });
    return response.text;
  } catch (error) {
    return "Shahar tahlili to'xtatildi.";
  }
};

export const explainEncoding = async (text: string, type: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `"${text}" matni "${type}" usulida shifrlangan. Ushbu texnik jarayonning xavfsizlik darajasini tushuntiring. Faqat texnik ma'lumot bering, brend nomlarini ishlatmang. Uzbek tilida.`,
    });
    return response.text;
  } catch (error) {
    return "Xavfsizlik protokoli tahlil qilinmoqda...";
  }
};
