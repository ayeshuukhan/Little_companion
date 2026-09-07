// // This is the ONLY place predefined reactions, affirmations, and section
// // copy live. The AI never generates any of this — it only ever returns
// // "happy" | "sad" | "neutral", and this file supplies everything the
// // frontend does in response.

// export type Mood = "happy" | "sad";

// // export interface ReactionLine {
// //   spoken: string;
// //   written: string;
// // }

// export type ReactionLanguage = "en" | "roman-urdu";

// export interface ReactionLine {
//   spoken: string;
//   written: string;
//   language: ReactionLanguage;
// }




// export interface MoodResponse {
//   variants: ReactionLine[];
//   processingLine: string;
//   sounds: string[];
//   voice: { rate: number; pitch: number };
// }




// This is the ONLY place predefined reactions, affirmations, and section
// copy live. The AI never generates any of this — it only ever returns
// "happy" | "sad" | "neutral", and this file supplies everything the
// frontend does in response.

// export type Mood = "happy" | "sad";

// export type ReactionLanguage = "en" | "roman-urdu";

// export interface ReactionLine {
//   spoken: string;
//   written: string;
// }

// export interface MoodResponse {
//   variants: ReactionLine[];
//   processingLine: string;
//   sounds: string[];
//   voice: { rate: number; pitch: number };
// }


export type Mood = "happy" | "sad";

export type ReactionLanguage = "en" | "roman-urdu";

export interface ReactionLine {
  spoken: string;
  written: string;
  language: ReactionLanguage;
}

export interface MoodResponse {
  variants: ReactionLine[];
  processingLine: string;
  sounds: string[];
  voice: { rate: number; pitch: number };
}







// 12 varied pairs per mood — a different one is picked at random each
// time so the reaction doesn't feel identical on repeat writes.
export const responses: Record<Mood, MoodResponse> = {
  // happy: {
  //   variants: [
  //     { spoken: "YAAAAAY! You got it, babe!", written: "Okay, got it. Now work more on yourself." },
  //     { spoken: "That's very good! I always said you could do it — hooohoooo, look at you go!", written: "Keep going, love. This is what it looks like." },
  //     { spoken: "Yesss! I knew you had it in you the whole time!", written: "Don't forget this feeling. You earned it." },
  //     { spoken: "Ayyy look at you! Proud doesn't even cover it!", written: "Save this one. You'll want to remember it." },
  //     { spoken: "Woohoo! That's my girl — you did that!", written: "Now go treat yourself, even a little." },
  //     { spoken: "Okayyy I'm actually so proud of you right now!", written: "This is a you-earned-it kind of day." },
  //     { spoken: "yaayy, look at you glowing! You did it!", written: "Let this be proof you can do hard things." },
  //     { spoken: "YES babe, this is exactly what I meant — you're unstoppable!", written: "Keep this. It's a good one." },
  //     { spoken: "Hooohoo, there she is! I told you so!", written: "Now work more on yourself, gently." },
  //     { spoken: "This made my whole day, honestly. So happy for you!", written: "Hold onto this feeling for later." },
  //     { spoken: "You did it! I'm doing a little dance over here!", written: "You should be proud. I am." },
  //     { spoken: "Love u pretty, you really pulled through!", written: "That's a win. Let it count." },
  //   ],
  //   processingLine: "Hmm... I got you.",
  //   sounds: ["/audio/happy-fireworks.mp3", "/audio/happy-giggle.mp3"],
  //   voice: { rate: 1.15, pitch: 1.35 },
  happy: {
  variants: [

    // 1
    {
      spoken: "Yayyy! You actually did it, babe! I knew you had this in you!",
      written: "This is your moment. Write it down and keep it somewhere safe — because one day when you doubt yourself, this will remind you that you were capable all along.",
      language: "en",
    },

    // 
    {
      spoken: "Heeeyyy, look at you! That's actually amazing! I told you you could do it!",
      written: "You earned this feeling. Write this moment down, even if it's just a few words. Future you deserves to remember how proud you felt today.",
      language: "en",
      
    },

    // 3
    {
      spoken: "Yessss! I knew you had it in you the whole time! Look at you go!",
      written: "Don't let this moment disappear. Write it down and remember what you did to get here. This is the kind of memory that builds confidence.",
      language: "en",
    },

    // 4
    {
      spoken: "Ayyy, look at you! I'm genuinely so proud of you right now!",
      written: "Save this moment. Write down what happened and how you felt, because later, when things get difficult, you'll have proof that you can overcome hard things.",
      language: "en",
    },

    // 5
    {
      spoken: "Woohoo! That's my girl! You really went and did that!",
      written: "Okay, this one deserves to be remembered. Write it down, celebrate yourself a little, and let yourself actually enjoy what you achieved.",
      language: "en",
    },

    // 6
    {
      spoken: "Okayyy, I'm actually SO proud of you right now! You should be proud of yourself too!",
      written: "Take a second and let this feeling sink in. Write this moment down — not just what you achieved, but how proud you felt while achieving it.",
      language: "en",
    },

    // 7
    {
      spoken: "Haiyaa! Look at you glowing! You really did it! I'm so happy for you!",
      written: "Keep this moment close. Write it down because this is more than just a happy day — it's proof that your effort can turn into something real.",
      language: "en",
    },

    // 8
    {
      spoken: "YESSS babe! This is exactly what I was talking about! You're seriously unstoppable when you believe in yourself!",
      written: "Remember this version of yourself. Write this moment down so you can come back to it whenever your confidence gets low. You've already proven what you can do.",
      language: "en",
    },

    // 9
    {
      spoken: "Hooohoo! There she is! I told you so! Look how far you've come!",
      written: "Don't rush past this moment. Write it down and give yourself credit for the work, patience, and courage that brought you here.",
      language: "en",
    },

    // 10
    {
      spoken: "Awww, this honestly made my whole day! I'm genuinely so, so happy for you!",
      written: "Hold onto this feeling. Write down what made today special, because happy moments like this can become little reminders of how beautiful progress can feel.",
      language: "en",
    },

    // 11
    {
      spoken: "YOU DID IT! I'm literally doing a little celebration dance over here!",
      written: "Please let yourself celebrate this. Write the moment down and remember it properly — you don't always have to rush toward the next goal without appreciating the one you just reached.",
      language: "en",
    },

    // 12
    {
      spoken: "Love you, pretty! You really pulled through! I'm so proud of the way you kept going!",
      written: "This is a win, and you deserve to let it count. Write it down and remember that you kept going even when it wasn't always easy.",
      language: "en",
    },

    // 13
    {
      spoken: "YAYYY! Look at you! That feeling right there? You earned every bit of it!",
      written: "Write this moment down. Remember what you accomplished, how you felt, and how much effort it took. This memory can give you confidence the next time you question yourself.",
      language: "en",
    },

    // 14
    {
      spoken: "Oh my Goddd, you actually did it! I'm smiling so hard right now!",
      written: "Don't just move on to the next thing. Pause for a moment, breathe, and write this one down. You deserve to remember that you made something happen.",
      language: "en",
    },

    // 15
    {
      spoken: "WOOAH! Big win! I'm genuinely impressed! You should be celebrating yourself right now!",
      written: "Put this moment into words. Write down what you achieved and why it matters to you. One day, you'll look back at this and realize how much you've grown.",
      language: "en",
    },

    // 16
    {
      spoken: "Ayyy! We love to see it! You worked for this, and now you get to enjoy it!",
      written: "Take the win. Write this moment down and let yourself feel proud without immediately thinking about what you have to do next.",
      language: "en",
    },

    // 17
    {
      spoken: "Yessss! That's a whole success story right there! I'm so happy you got to experience this!",
      written: "Remember this feeling. Write it somewhere you can find it later, because your future self might need this little reminder that good things can happen when you keep going.",
      language: "en",
    },

    // 18
    {
      spoken: "Look at youuu! From worrying about whether you could do it to actually doing it! I'm so proud!",
      written: "Write this moment down because it tells a story — you were unsure, you kept going, and you made it. That's exactly the kind of memory that builds confidence.",
      language: "en",
    },

    // 19
    {
      spoken: "Ohhh, this is GOOD! I'm genuinely excited for you! You deserve this little victory!",
      written: "Don't minimize this achievement. Write it down, celebrate it, and give yourself permission to be proud. Small wins become confidence over time.",
      language: "en",
    },

    // 20
    {
      spoken: "YAHOOOO! Another win for you! See? You are way more capable than you sometimes give yourself credit for!",
      written: "Keep this moment. Write it down so you can return to it whenever self-doubt shows up. Let this be evidence that you can do difficult things.",
      language: "en",
    },

    // // 21 — Roman Urdu
    // {
    //   spoken: "YAHOOOO! Haiyaa! Tum ne kar diyaaa! Mujhe pata tha tum kar sakti ho!",
    //   written: "Is moment ko zaroor likh lo. Kal ya kisi mushkil din jab tumhara confidence low ho, yeh tumhein yaad dilayega ke tum ne pehle bhi mushkil cheez kar ke dikhayi hai.",
    //   language: "roman-urdu",
    // },

    // // 22
    // {
    //   spoken: "Ayyy dekho toh sahi tumhein! Itni khushi ho rahi hai tumhare liye! Tum ne sach mein kar diya!",
    //   written: "Is khushi ko bas guzarne mat dena. Is moment ko likh lo, kya achieve kiya aur tumhein kaisa feel hua. Baad mein yahi memory tumhara confidence barhaye gi.",
    //   language: "roman-urdu"
    // },

    // // 23
    // {
    //   spoken: "Yessss! Mujhe tum par bohat fakhar hai! Dekha? Tum kar sakti ho!",
    //   written: "Is moment ko save kar lo. Likho ke aaj tumne kya achieve kiya aur kitni mehnat ke baad yahan pohanchi. Jab kabhi doubt ho, yeh yaad tumhein strong feel karwaye gi.",
    //   language: "roman-urdu"
    // },

    // // 24
    // {
    //   spoken: "Haiyaa! Kya baat hai! Aaj toh tum full glow kar rahi ho! You really did it!",
    //   written: "Aaj ke is moment ko likh lena. Har achievement ko appreciate karna zaroori hai, kyun ke yahi choti choti victories waqt ke saath tumhara confidence build karti hain.",
    //   language: "roman-urdu"
    // },

    // // 25
    // {
    //   spoken: "Woohoo! Tum ne kar dikhaya! Ab thora sa khud ko appreciate bhi karo, okay?",
    //   written: "Is moment ko likh lo aur khud ko credit do. Sirf next goal ke peechay mat bhaago — kabhi kabhi ruk kar yeh mehsoos karna bhi zaroori hai ke tum kitna aagay aa chuki ho.",
    //   language: "roman-urdu"
    // },

    // // 26
    // {
    //   spoken: "Okayyy, I'm genuinely itni proud hoon tum par! Tumhein bhi apne aap par proud hona chahiye!",
    //   written: "Is feeling ko yaad rakhna. Is moment ko likh lo, kyun ke future mein jab confidence kam ho, tumhein yahi yaad dilayega ke tum actually bohat kuch kar sakti ho.",
    //   language: "roman-urdu"
    // },

    // // 27
    // {
    //   spoken: "YAYYY! Finallyyy! Dekha? Itni tension ke baad bhi tum ne kar hi liya!",
    //   written: "Is moment ko likh lo. Jo cheez aaj impossible ya bohat difficult lag rahi thi, tum usay complete kar ke yahan tak aa gayi. Yeh tumhari mehnat ka proof hai.",
    //   language: "roman-urdu"
    // },

    // // 28
    // {
    //   spoken: "Ohooo! Kya win hai! Mujhe bohat khushi ho rahi hai tumhare liye!",
    //   written: "Is win ko chota mat samajhna. Isay likh lo aur yaad rakho ke tumne is ke liye kya effort diya tha. Aisi memories baad mein bohat confidence deti hain.",
    //   language: "roman-urdu"
    // },

    // // 29
    // {
    //   spoken: "Look at youuu! Tum ne literally kar dikhaya! I'm so, so happy for you!",
    //   written: "Aaj ka yeh moment likh lo. Jab future mein tumhein lage ke tum kuch nahi kar sakti, yeh page tumhein yaad dilayega ke tum already kitni baar khud ko prove kar chuki ho.",
    //   language: "roman-urdu"
    // },

    // // 30
    // {
    //   spoken: "Yesss babe! Aaj toh celebration banti hai! Tum ne bohat acha kiya!",
    //   written: "Thora ruk kar is khushi ko feel karo. Is moment ko likh lo aur khud ko appreciate karo, kyun ke tumhari progress sirf result nahi, tumhari mehnat ki kahani bhi hai.",
    //   language: "roman-urdu"
    // }
  ],

  processingLine: "Hmm... I got you.",

  sounds: [
    "/audio/happy-fireworks.mp3",
    "/audio/happy-giggle.mp3"
  ],

  voice: {
    rate: 1.13,
    pitch: 1.35
  }

  },

sad: {
  variants: [

    // 1
    {
      spoken: "Heyyy, come here... let me give you a huggiee. You don't have to handle everything alone.",
      written: "Write this moment down, even if you only write a few words. Letting your feelings out can make your heart feel a little lighter, and you don't have to figure everything out tonight.",
      language: "en"
    },

    // 2
    {
      spoken: "Hey, breathe with me... slowly. I know it feels like a lot right now, but you don't have to solve your whole life in one moment.",
      written: "Write down what you're feeling first, not just the solution. Sometimes putting the weight into words helps you feel a little lighter before you decide what to do next.",
      language: "en"
    },

    // 3
    {
      spoken: "Come here, love. It's okay to not be okay right now. You don't have to pretend that everything is fine.",
      written: "Let yourself feel this moment instead of pushing it away. Write it down and let it out — sometimes giving your feelings a place to exist makes them feel a little less heavy.",
      language: "en"
    },

    // 4
    {
      spoken: "Heyyy... chin up, baby. I know this hurts right now, but this one difficult moment doesn't get to define your whole story.",
      written: "Write this moment down. One day you'll look back and realize that what felt so overwhelming today was only one chapter, not the entire story.",
      language: "en"
    },

    // 5
    {
      spoken: "Take a slow breath with me. You're safe here, okay? For this moment, you don't have to be strong.",
      written: "Write down whatever is sitting on your heart. Let it out without judging yourself — sometimes naming the feeling is the first little step toward feeling lighter.",
      language: "en"
    },

    // 6
    {
      spoken: "I know it's heavy right now... and I'm right here with you. You don't need to rush yourself through it.",
      written: "Give yourself permission to rest. Write this moment down so you can remember that even when things felt heavy, you still kept going.",
      language: "en"
    },

    // 7
    {
      spoken: "Hey hey... let it out. You don't have to keep everything bottled up. I've got you.",
      written: "Write down what hurts instead of keeping it all inside. Letting it out can help you breathe a little easier and make the weight feel a little lighter.",
      language: "en"
    },

    // 8
    {
      spoken: "Come sit with me for a second... no fixing, no rushing. Just breathe. We'll take this one moment at a time.",
      written: "Write this moment down exactly as it feels right now. You don't need to make it sound pretty. Just let it out — future you may be surprised by how far you've come.",
      language: "en"
    },

    // 9
    {
      spoken: "You're doing better than you think, love. I know it doesn't feel that way right now, but you're still here, and that's something.",
      written: "Be gentle with yourself today. Write down what you're going through and give yourself the same kindness you'd give someone you love.",
      language: "en"
    },

    // 10
    {
      spoken: "It's okay to cry it out. Seriously. You don't have to hold those tears in just to look strong.",
      written: "Write it down and let it out. Cry if you need to, breathe when you can, and give yourself time. You may feel a little lighter once the feelings aren't trapped inside.",
      language: "en"
    },

    // 11
    {
      spoken: "Chin up, love... one breath, one step, one moment at a time. You don't have to figure everything out today.",
      written: "Write down what you can control and leave the rest for later. Even one tiny step forward is still movement, and that's enough for today.",
      language: "en"
    },

    // 12
    {
      spoken: "Come here... another huggiee for you. I know today isn't easy, but you don't have to carry it perfectly.",
      written: "Write this moment down and let yourself be honest about how you feel. Hard days deserve to be acknowledged too, because getting through them is an achievement in itself.",
      language: "en"
    },

    // 13
    {
      spoken: "Heyyy... I know your heart feels tired right now. Just stay with me for a moment and take a slow breath.",
      written: "Put your feelings into words before you try to fix anything. Write this moment down, let it out, and give your mind a little room to breathe.",
      language: "en"
    },

    // 14
    {
      spoken: "Hey love, I know you're hurting. You don't have to turn this pain into strength immediately. You can simply feel it first.",
      written: "Write down what happened and how it made you feel. You don't have to solve it while you're hurting. Sometimes being honest about the pain is what helps you start moving through it.",
      language: "en"
    },

    // 15
    {
      spoken: "Breathe, sweetheart... this is a hard moment, not a permanent life sentence. Give yourself some time.",
      written: "Write this moment down so you can remember that feelings change. What feels impossible today may feel completely different after you've had time to breathe and heal.",
      language: "en"
    },

    // 16
    {
      spoken: "Heyyy, listen to me... you are allowed to have a bad day. You are allowed to be tired. You are allowed to need a little time.",
      written: "Write this moment down without blaming yourself. Let it out, rest if you need to, and remember that having a difficult day doesn't mean you're doing badly at life.",
      language: "en"
    },

    // 17
    {
      spoken: "Come here, babe... I know you wanted things to go differently. It's okay to be disappointed when something really mattered to you.",
      written: "Write down what you wished would happen and what actually happened. Let yourself process the disappointment instead of pretending it didn't hurt.",
      language: "en"
    },

    // 18
    {
      spoken: "I'm here. No judgment, no pressure. You can tell me the messy version too. You don't have to make it sound okay.",
      written: "Write the messy version down too. You don't need perfect words. Letting your thoughts out can help you understand what you're actually feeling.",
      language: "en"
    },

    // 19
    {
      spoken: "Heyyy... look at me. One bad day doesn't erase all the good days you've already survived and lived through.",
      written: "Write this moment down and remember the days you've made it through before. This feeling is real, but it isn't forever, and neither is this difficult chapter.",
      language: "en"
    },

    // 20
    {
      spoken: "You know what? You can put the world down for a minute. You don't always have to keep everything together.",
      written: "Write down what you've been carrying. Let it out instead of holding everything inside. You deserve a little space to breathe before you pick things back up.",
      language: "en"
    },

    // 21 — Roman Urdu
    // {
    //   spoken: "Heyyy, idhar aao... pehle ek huggiee. Tumhein har cheez akelay handle karne ki zaroorat nahi hai.",
    //   written: "Is moment ko likh lo, chahe sirf kuch lines hi kyun na hon. Jo dil mein hai usay bahar nikalne se dil thora halka mehsoos hota hai. Har cheez ka solution abhi dhoondhna zaroori nahi.",
    //   language: "roman-urdu"
    // },

    // // 22
    // {
    //   spoken: "Hey, mere saath slowly saans lo... bas aaram se. Mujhe pata hai abhi sab kuch bohat zyada lag raha hai.",
    //   written: "Pehle yeh likho ke tum actually kya feel kar rahi ho. Har problem ka solution foran dhoondhna zaroori nahi hota. Kabhi kabhi feelings ko words mein nikal dena hi dil ko halka kar deta hai.",
    //   language: "roman-urdu"
    // },

    // // 23
    // {
    //   spoken: "Aao love... it's okay agar abhi tum okay nahi ho. Har waqt strong rehna zaroori nahi hota.",
    //   written: "Is feeling ko andar daba kar mat rakho. Is moment ko likh lo aur jo dil mein hai woh let out kar do. Jab feelings bahar aa jati hain toh aksar dil thora halka mehsoos karta hai.",
    //   language: "roman-urdu"
    // },

    // // 24
    // {
    //   spoken: "Heyyy... chin up, baby. Mujhe pata hai abhi bohat hurt ho raha hai, lekin yeh tumhari poori story nahi hai.",
    //   written: "Is moment ko likh lena. Aaj jo cheez bohat badi aur overwhelming lag rahi hai, kal tum shayad usay apni story ka sirf ek chapter samjho gi.",
    //   language: "roman-urdu"
    // },

    // // 25
    // {
    //   spoken: "Mere saath ek deep breath lo... bas ek. Abhi tumhein strong banne ki zaroorat nahi hai, bas thora sa rest karo.",
    //   written: "Jo dil mein hai woh likh do. Apni feelings ko judge mat karo, bas unhein bahar aane do. Kabhi kabhi words mein nikal dene se andar ka pressure thora kam ho jata hai.",
    //   language: "roman-urdu"
    // },

    // // 26
    // {
    //   spoken: "Mujhe pata hai abhi sab kuch bohat heavy feel ho raha hai... but I'm right here. Tumhein jaldi karne ki zaroorat nahi.",
    //   written: "Aaj khud ke saath gentle raho. Is moment ko likh lo aur yaad rakho ke mushkil din ke bawajood tum yahan tak pohanchi ho. That's something to be proud of too.",
    //   language: "roman-urdu"
    // },

    // // 27
    // {
    //   spoken: "Hey hey... let it out, okay? Jo dil mein hai keh do. Sab kuch andar rakhna zaroori nahi hai.",
    //   written: "Jo cheez hurt kar rahi hai usay likh do. Feelings ko bahar nikalne do, kyun ke kabhi kabhi baat karne ya likhne ke baad dil ka weight thora kam mehsoos hota hai.",
    //   language: "roman-urdu"
    // },

    // // 28
    // {
    //   spoken: "Aao mere paas baitho... bas ek minute ke liye. Kuch fix nahi karna, sirf saans leni hai.",
    //   written: "Is moment ko bilkul waise hi likho jaise tum feel kar rahi ho. Perfect words ki zaroorat nahi. Bas let it out — future mein tumhein khud hairani hogi ke tum kitna aagay aa gayi.",
    //   language: "roman-urdu"
    // },

    // // 29
    // {
    //   spoken: "Tum jitna samajh rahi ho us se better kar rahi ho, love. Mujhe pata hai abhi aisa feel nahi ho raha.",
    //   written: "Aaj khud ko blame mat karna. Is moment ko likh lo aur khud ke saath wohi softness rakho jo tum kisi apne favourite person ke saath rakhti.",
    //   language: "roman-urdu"
    // },

    // // 30
    // {
    //   spoken: "Agar rona aa raha hai toh ro lo, baby. Tears ko rok kar strong prove karne ki zaroorat nahi hai.",
    //   written: "Is moment ko likh lo aur jo feel ho raha hai usay let out karo. Rona, likhna, baat karna — kabhi kabhi feelings ko bahar nikalne se dil thora halka ho jata hai.",
    //   language: "roman-urdu"
    // },

    // // 31
    // {
    //   spoken: "Chin up, love... ek step, ek breath, ek moment at a time. Tumhein aaj poori life figure out nahi karni.",
    //   written: "Aaj sirf woh likho jo tumhare control mein hai. Chota sa step bhi progress hota hai. Tumhein sab kuch ek hi din mein solve karne ki zaroorat nahi.",
    //   language: "roman-urdu"
    // },

    // // 32
    // {
    //   spoken: "Haiyaa... idhar aao, ek aur huggiee. Aaj easy nahi tha, aur it's okay to admit that.",
    //   written: "Is moment ko likh lena aur honestly acknowledge karna ke aaj mushkil tha. Hard day se guzarna bhi ek achievement hai — kyun ke tum phir bhi us din se guzri.",
    //   language: "roman-urdu"
    // },

    // // 33
    // {
    //   spoken: "Hey love... mujhe pata hai dil thak gaya hai. Bas mere saath thori dair raho aur slowly saans lo.",
    //   written: "Jo feelings hain unhein words de do. Is moment ko likh lo, let it out, aur apne mind ko thori space do. Har cheez ko abhi fix karna zaroori nahi.",
    //   language: "roman-urdu"
    // },

    // // 34
    // {
    //   spoken: "Mujhe pata hai tum hurt ho. Tumhein foran is pain ko strength mein convert karne ki zaroorat nahi. Pehle feel kar lo.",
    //   written: "Jo hua aur us se tumhein kaisa feel hua, dono likh lo. Tumhein hurt hote hue bhi solution dhoondhne ki jaldi nahi. Kabhi kabhi pain ko honestly accept karna healing ka first step hota hai.",
    //   language: "roman-urdu"
    // },

    // // 35
    // {
    //   spoken: "Saans lo, sweetheart... yeh ek mushkil moment hai, tumhari poori zindagi nahi. Khud ko thora time do.",
    //   written: "Is moment ko likh lo aur yaad rakho ke feelings change hoti hain. Jo aaj impossible lag raha hai, zaroori nahi ke kal bhi waisa hi feel ho.",
    //   language: "roman-urdu"
    // },

    // // 36
    // {
    //   spoken: "Heyyy, meri baat suno... tumhara bad day hona tumhein failure nahi banata. Tumhein bhi kabhi rest ki zaroorat hoti hai.",
    //   written: "Is moment ko likh lo aur khud ko blame mat karo. Mushkil din ka matlab yeh nahi ke tum life mein fail ho rahi ho. Kabhi kabhi bas rukna aur breathe karna bhi zaroori hota hai.",
    //   language: "roman-urdu"
    // },

    // // 37
    // {
    //   spoken: "Aao babe... mujhe pata hai tum chahti thi ke sab kuch different ho. Disappointed hona bilkul okay hai.",
    //   written: "Jo tum chahti thi aur jo actually hua, dono likh lo. Apni disappointment ko ignore mat karo. Feelings ko process karne ka bhi apna time hota hai.",
    //   language: "roman-urdu"
    // },

    // // 38
    // {
    //   spoken: "I'm here, okay? No judgment. Tum messy version bhi bata sakti ho. Tumhein sab kuch theek dikhane ki zaroorat nahi.",
    //   written: "Is moment ko likh lo exactly waise hi jaise tum feel kar rahi ho. Perfect words ki zaroorat nahi. Bas jo thoughts hain unhein bahar aane do.",
    //   language: "roman-urdu"
    // },

    // // 39
    // {
    //   spoken: "Heyyy... meri taraf dekho. Ek bad day tumhari saari achi memories ko erase nahi kar sakta.",
    //   written: "Is moment ko likh lo aur un days ko bhi yaad karo jin se tum pehle nikal chuki ho. Yeh feeling real hai, lekin yeh hamesha nahi rahegi.",
    //   language: "roman-urdu"
    // },

    // // 40
    // {
    //   spoken: "You know what? Aaj thori dair ke liye duniya ko side par rakh do. Tumhein har cheez sambhal kar rakhne ki zaroorat nahi.",
    //   written: "Jo kuch tum carry kar rahi ho, usay likh do. Let it out. Tum deserve karti ho ke thori dair breathe karo, rest karo, aur phir jab ready ho tab dobara aagay barho.",
    //   language: "roman-urdu"
    // }
  ],

  processingLine: "Hmm... I got you.",

  sounds: [
    "/audio/sad-comfort.mp3",
    "/audio/sad-hug-chime.mp3"
  ],

  voice: {
    rate: 0.86,
    pitch: 0.92
  }
},

};

export function pickVariant(mood: Mood): ReactionLine {
  const list = responses[mood].variants;
  return list[Math.floor(Math.random() * list.length)];
}

// --- Journal sections -------------------------------------------------
// Each mood also has a little private space the person can open any
// time to write something down. Writing there is NOT run through the
// emotion classifier — it's just a personal log, so every entry gets a
// short spoken affirmation from a fixed pool.

export interface SectionConfig {
  mood: Mood;
  name: string;
  tagline: string;
  placeholder: string;
  buttonLabel: string;
  emptyState: string;
  affirmations: string[];
  voice: { rate: number; pitch: number };
}

export const sections: Record<Mood, SectionConfig> = {
  happy: {
    mood: "happy",
    name: "Golden Moments",
    tagline: "A little shelf for the things you're proud of.",
    placeholder: "What made you proud today?",
    buttonLabel: "Save this moment",
    emptyState: "Nothing here yet — write down the first thing you're proud of.",
    affirmations: [
      "Perfect, babe.",
      "Great.",
      "Good work.",
      "That's the one.",
      "Best.",
      "So proud of you.",
      "Keep that.",
      "That's it, love.",
      "Look at you.",
      "So well earned.",
    ],
    voice: { rate: 1.1, pitch: 1.3 },
  },
  sad: {
    mood: "sad",
    name: "Let It Out",
    tagline: "Somewhere to put it down so you don't have to carry it.",
    placeholder: "Let it all out...",
    buttonLabel: "Set it down",
    emptyState: "Nothing here yet — when it's heavy, write it down here.",
    affirmations: [
      "Yes baby, you are greater than this.",
      "Chin up. I love you.",
      "Let it go, love.",
      "You're safe here.",
      "That's it — let it out.",
      "You are stronger than this moment.",
      "This won't be the whole story.",
      "I've got you.",
      "Breathe. You're okay.",
      "You're allowed to rest.",
    ],
    voice: { rate: 0.9, pitch: 0.95 },
  },
};

export function pickAffirmation(mood: Mood): string {
  const list = sections[mood].affirmations;
  return list[Math.floor(Math.random() * list.length)];
}

export const copy = {
  idleTitle: "I'm listening...",
  placeholder: "Tell me what's on your mind...",
  submitLabel: "Tell me",
  processingLabel: "Hmm... I got you.",
  errorEmpty: "Write a little something first — even a few words is plenty.",
  errorClassifier: "Hmm... I didn't quite catch that. Try telling me again?",
  againLabel: "Tell me something else",
};

// --- Themes -------------------------------------------------------------
// Changeable from Settings. Only affects the idle/background mood, not
// the semantic happy/sad reaction colors.

export type ThemeId = "dusk" | "sunrise" | "midnight";

export interface Theme {
  id: ThemeId;
  label: string;
  bgClass: string;
  auraClass: string;
  textClass: string;
}

export const themes: Theme[] = [
  {
    id: "dusk",
    label: "Dusk",
    bgClass: "bg-dusk-950",
    auraClass: "from-ember-500/25 via-bloom-500/20 to-hush-500/25",
    textClass: "text-white",
  },
  {
    id: "sunrise",
    label: "Sunrise",
    bgClass: "bg-[#2b1f2a]",
    auraClass: "from-ember-400/30 via-ember-500/20 to-bloom-400/25",
    textClass: "text-white",
  },
  {
    id: "midnight",
    label: "Midnight",
    bgClass: "bg-[#0b0e1a]",
    auraClass: "from-hush-600/25 via-bloom-600/20 to-hush-400/20",
    textClass: "text-white",
  },
];
