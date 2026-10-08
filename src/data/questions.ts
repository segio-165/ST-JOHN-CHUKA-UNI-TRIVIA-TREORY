export interface RawQuestion {
  id: number;
  q: string;
  options: string[];
  correctText: string;
  category: 'General Principles' | 'Fractures' | 'Dislocations' | 'Sprains & Strains' | 'Medical Emergencies';
}

export const masterQuestions: RawQuestion[] = [
  {
    id: 1,
    q: "1. What is first aid?",
    options: [
      "Advanced surgical care administered exclusively in hospitals",
      "The initial assistance or treatment given to a person who is injured or taken ill[cite: 12]",
      "Prescribing medication without doctor consultation",
      "Transporting casualties without evaluation"
    ],
    correctText: "The initial assistance or treatment given to a person who is injured or taken ill[cite: 12]",
    category: "General Principles"
  },
  {
    id: 2,
    q: "2. Why is first aid important?",
    options: [
      "It provides early treatment and prioritizes life-threatening conditions before expert help arrives[cite: 14, 59]",
      "It completely replaces the need for ambulances",
      "It allows anyone to prescribe drugs legally",
      "It guarantees zero recovery time"
    ],
    correctText: "It provides early treatment and prioritizes life-threatening conditions before expert help arrives[cite: 14, 59]",
    category: "General Principles"
  },
  {
    id: 3,
    q: "3. What are the main aims of first aid?",
    options: [
      "To diagnose chronic diseases",
      "To preserve life, prevent worsening conditions, and promote recovery[cite: 12]",
      "To perform complex medical operations",
      "To collect insurance details"
    ],
    correctText: "To preserve life, prevent worsening conditions, and promote recovery[cite: 12]",
    category: "General Principles"
  },
  {
    id: 4,
    q: "4. What is emphasized in emergency care regarding response timing?",
    options: [
      "Delaying care until specialists arrive",
      "Waiting 2 hours before checking breathing",
      "Early help, early CPR, and early advanced care to maximize survival[cite: 59]",
      "Ignoring vital signs"
    ],
    correctText: "Early help, early CPR, and early advanced care to maximize survival[cite: 59]",
    category: "General Principles"
  },
  {
    id: 5,
    q: "5. What are the ABCs of first aid?",
    options: [
      "Arteries, Bones, Cells",
      "Activity, Bandaging, Care",
      "Acute, Baseline, Chronic",
      "Airway, Breathing, and Circulation[cite: 43]"
    ],
    correctText: "Airway, Breathing, and Circulation[cite: 43]",
    category: "General Principles"
  },
  {
    id: 6,
    q: "6. How do you assess the scene of an emergency before giving first aid?",
    options: [
      "Run straight to the casualty ignoring all hazards",
      "Evaluate safety risks, identify mechanisms of injury, and ensure the area is safe before approaching[cite: 28]",
      "Wait inside a vehicle until traffic clears completely",
      "Ask bystanders to clear out without checking safety"
    ],
    correctText: "Evaluate safety risks, identify mechanisms of injury, and ensure the area is safe before approaching[cite: 28]",
    category: "General Principles"
  },
  {
    id: 7,
    q: "7. Why is personal safety important before administering first aid?",
    options: [
      "Rescuers are legally immune to all accidents",
      "It ensures your clothes do not get dirty",
      "If you put yourself at risk, you could become a casualty yourself and be unable to help[cite: 14]",
      "It is only a recommendation with no real consequence"
    ],
    correctText: "If you put yourself at risk, you could become a casualty yourself and be unable to help[cite: 14]",
    category: "General Principles"
  },
  {
    id: 8,
    q: "8. What is a greenstick fracture, and why is it common in children?",
    options: [
      "When immature bone partially splits; common because children's bones are supple[cite: 144, 145]",
      "A fracture caused by plant toxins; common in summer",
      "A complete shattering of the bone",
      "A fracture of the fingernails"
    ],
    correctText: "When immature bone partially splits; common because children's bones are supple[cite: 144, 145]",
    category: "Fractures"
  },
  {
    id: 9,
    q: "9. How are comminuted fractures described in context?",
    options: [
      "They are not detailed specifically in the provided text as standalone definitions",
      "Cracks caused by cold weather",
      "Simple closed hairline fractures",
      "Sprains of the wrist"
    ],
    correctText: "They are not detailed specifically in the provided text as standalone definitions",
    category: "Fractures"
  },
  {
    id: 10,
    q: "10. How are stress fractures covered in the manual?",
    options: [
      "Detailed with complete rehabilitation steps",
      "Treated exclusively with heat packs",
      "Not detailed specifically as a standalone definition in the provided text",
      "Classified as muscle tears"
    ],
    correctText: "Not detailed specifically as a standalone definition in the provided text",
    category: "Fractures"
  },
  {
    id: 11,
    q: "11. What are the common causes of fractures?",
    options: [
      "Significant direct force (heavy blow) or indirect force (twist or wrench), and bone weakness[cite: 138, 144]",
      "Drinking too much water",
      "Lack of sleep",
      "Loud noises"
    ],
    correctText: "Significant direct force (heavy blow) or indirect force (twist or wrench), and bone weakness[cite: 138, 144]",
    category: "Fractures"
  },
  {
    id: 12,
    q: "12. How does osteoporosis contribute to fractures?",
    options: [
      "It increases muscle mass excessively",
      "It causes bones to lose density, making them brittle and prone to breaking[cite: 136]",
      "It causes joints to fuse permanently",
      "It accelerates bone growth past normal limits"
    ],
    correctText: "It causes bones to lose density, making them brittle and prone to breaking[cite: 136]",
    category: "Fractures"
  },
  {
    id: 13,
    q: "13. Why are elderly individuals more prone to fractures?",
    options: [
      "They run faster than younger people",
      "Their bones become elastic like rubber",
      "They never experience minor falls",
      "They often suffer from conditions like osteoporosis that reduce bone density and strength[cite: 45, 136]"
    ],
    correctText: "They often suffer from conditions like osteoporosis that reduce bone density and strength[cite: 45, 136]",
    category: "Fractures"
  },
  {
    id: 14,
    q: "14. How can sports-related injuries lead to fractures?",
    options: [
      "Through dehydration alone",
      "By wearing sunglasses",
      "By increasing blood circulation too fast",
      "Through sudden impacts, falls, and twisting forces exceeding bone strength[cite: 45, 138]"
    ],
    correctText: "Through sudden impacts, falls, and twisting forces exceeding bone strength[cite: 45, 138]",
    category: "Fractures"
  },
  {
    id: 15,
    q: "15. What role does bone density play in fracture risk?",
    options: [
      "High density guarantees broken bones",
      "Lower bone density increases brittleness and fracture risk[cite: 136]",
      "Density has no effect on bones",
      "Only muscle volume matters"
    ],
    correctText: "Lower bone density increases brittleness and fracture risk[cite: 136]",
    category: "Fractures"
  },
  {
    id: 16,
    q: "16. How can falls lead to fractures?",
    options: [
      "By stretching skin cells",
      "By lowering body temperature",
      "By exerting sudden impact forces that exceed bone tolerance, especially from heights or in vulnerable adults[cite: 45, 138]",
      "By causing temporary amnesia"
    ],
    correctText: "By exerting sudden impact forces that exceed bone tolerance, especially from heights or in vulnerable adults[cite: 45, 138]",
    category: "Fractures"
  },
  {
    id: 17,
    q: "17. What types of accidents commonly cause fractures?",
    options: [
      "Typing on a keyboard",
      "Traffic incidents, falls from heights, and heavy impacts[cite: 30, 45, 138]",
      "Listening to music",
      "Reading books"
    ],
    correctText: "Traffic incidents, falls from heights, and heavy impacts[cite: 30, 45, 138]",
    category: "Fractures"
  },
  {
    id: 18,
    q: "18. How do repetitive movements lead to stress fractures according to the manual context?",
    options: [
      "By melting bone tissue instantly",
      "By causing skin blisters",
      "They are not specifically detailed in the manual text",
      "By increasing lung capacity"
    ],
    correctText: "They are not specifically detailed in the manual text",
    category: "Fractures"
  },
  {
    id: 19,
    q: "19. How can a sudden impact result in a fracture?",
    options: [
      "It cools the blood vessels",
      "A heavy direct blow exceeds the bone's structural threshold[cite: 138]",
      "It stops breathing instantly",
      "It causes hair loss"
    ],
    correctText: "A heavy direct blow exceeds the bone's structural threshold[cite: 138]",
    category: "Fractures"
  },
  {
    id: 20,
    q: "20. What are pathological fractures associated with?",
    options: [
      "Clean cuts from surgical knives",
      "Infected skin grazes",
      "Bones weakened by disease, age, or disorders breaking under minimal stress or spontaneously[cite: 136, 138]",
      "Muscle cramps"
    ],
    correctText: "Bones weakened by disease, age, or disorders breaking under minimal stress or spontaneously[cite: 136, 138]",
    category: "Fractures"
  },
  {
    id: 21,
    q: "21. What are the common symptoms of a fracture?",
    options: [
      "Itchy palms and sneezing",
      "Extreme hunger and thirst",
      "Temporary blindness",
      "Pain, difficulty moving the area, swelling, and deformity[cite: 51, 138]"
    ],
    correctText: "Pain, difficulty moving the area, swelling, and deformity[cite: 51, 138]",
    category: "Fractures"
  },
  {
    id: 22,
    q: "22. How does swelling indicate a possible fracture?",
    options: [
      "It means the bone is healing instantly",
      "It indicates blood pressure is normal",
      "It frequently develops rapidly at the injury site alongside bruising and deformity[cite: 138]",
      "It occurs only in the brain"
    ],
    correctText: "It frequently develops rapidly at the injury site alongside bruising and deformity[cite: 138]",
    category: "Fractures"
  },
  {
    id: 23,
    q: "23. Why do fractures cause intense pain?",
    options: [
      "Because of psychological stress only",
      "Due to direct damage to the bone tissue, nerves, and surrounding structures[cite: 51, 138]",
      "Due to cold ambient temperature",
      "Because blood flow stops completely"
    ],
    correctText: "Due to direct damage to the bone tissue, nerves, and surrounding structures[cite: 51, 138]",
    category: "Fractures"
  },
  {
    id: 24,
    q: "24. How can deformity suggest a bone fracture?",
    options: [
      "Shortening, bending, or twisting of a limb, or visible irregularity indicates broken bone ends[cite: 138]",
      "It shows normal muscle relaxation",
      "It indicates skin dehydration",
      "It means the joint is flexible"
    ],
    correctText: "Shortening, bending, or twisting of a limb, or visible irregularity indicates broken bone ends[cite: 138]",
    category: "Fractures"
  },
  {
    id: 25,
    q: "25. What are the signs of an open fracture?",
    options: [
      "A completely unbroken skin surface with mild bruising",
      "Total absence of pain",
      "A wound at the fracture site where a broken bone end may protrude through the skin[cite: 140]",
      "Instant skin discoloration without wounds"
    ],
    correctText: "A wound at the fracture site where a broken bone end may protrude through the skin[cite: 140]",
    category: "Fractures"
  },
  {
    id: 26,
    q: "26. Why might a fractured limb appear shorter than usual?",
    options: [
      "Muscle expansion",
      "Displacement or overlapping of the broken bone ends[cite: 138]",
      "Swelling pulling skin inward",
      "Normal anatomical variation"
    ],
    correctText: "Displacement or overlapping of the broken bone ends[cite: 138]",
    category: "Fractures"
  },
  {
    id: 27,
    q: "27. How does bruising develop around a fracture?",
    options: [
      "Bleeding from damaged blood vessels leaks into the surrounding tissues[cite: 113, 138]",
      "From sunlight exposure",
      "From tight clothing",
      "Due to lack of vitamins"
    ],
    correctText: "Bleeding from damaged blood vessels leaks into the surrounding tissues[cite: 113, 138]",
    category: "Fractures"
  },
  {
    id: 28,
    q: "28. Why does loss of function occur in fractures?",
    options: [
      "The brain shuts down all motor skills",
      "Muscles turn into liquid",
      "Pain, structural instability, and broken bone structure prevent normal limb movement[cite: 138]",
      "Nerves freeze instantly"
    ],
    correctText: "Pain, structural instability, and broken bone structure prevent normal limb movement[cite: 138]",
    category: "Fractures"
  },
  {
    id: 29,
    q: "29. What sounds might indicate a bone fracture?",
    options: [
      "A loud clicking of teeth",
      "Coarse grating (crepitus) of bone ends, though rescuers should not test for this[cite: 138]",
      "Wheezing from the chest",
      "A whistling noise from joints"
    ],
    correctText: "Coarse grating (crepitus) of bone ends, though rescuers should not test for this[cite: 138]",
    category: "Fractures"
  },
  {
    id: 30,
    q: "30. How is X-ray confirmation handled according to the manual?",
    options: [
      "Performed by first aiders with pocket devices",
      "It is a diagnostic tool managed by hospital medical teams[cite: 138]",
      "Done using mobile phones",
      "Not mentioned at all"
    ],
    correctText: "It is a diagnostic tool managed by hospital medical teams[cite: 138]",
    category: "Fractures"
  },
  {
    id: 31,
    q: "31. What is the first step in managing a fracture?",
    options: [
      "Pull the limb straight immediately",
      "Apply hot oil massage",
      "Advise the casualty to keep still and support the joints above and below the injury[cite: 144]",
      "Encourage the casualty to walk"
    ],
    correctText: "Advise the casualty to keep still and support the joints above and below the injury[cite: 144]",
    category: "Fractures"
  },
  {
    id: 32,
    q: "32. Why is it important not to move a fractured limb unnecessarily?",
    options: [
      "To save bandage materials",
      "To prevent increased pain, nerve/vessel damage, and turning a closed fracture into an open one[cite: 138, 144]",
      "To let the bone heal in 5 seconds",
      "To avoid sweating"
    ],
    correctText: "To prevent increased pain, nerve/vessel damage, and turning a closed fracture into an open one[cite: 138, 144]",
    category: "Fractures"
  },
  {
    id: 33,
    q: "33. How should a suspected broken bone be immobilized?",
    options: [
      "Leave it completely unsupported and moving",
      "Staple the skin to a wooden board",
      "Support joints above and below the injury and apply appropriate slings, splints, or bandages[cite: 144]",
      "Apply heavy weights to it"
    ],
    correctText: "Support joints above and below the injury and apply appropriate slings, splints, or bandages[cite: 144]",
    category: "Fractures"
  },
  {
    id: 34,
    q: "34. How does ice/cold treatment apply to fractures per manual guidelines?",
    options: [
      "Ice should be rubbed directly inside open fracture wounds",
      "Cold compresses are specifically recommended for bruises, sprains, and strains rather than as a primary fracture fixation step[cite: 126, 142]",
      "Ice melts bone fragments",
      "Ice replaces bandages"
    ],
    correctText: "Cold compresses are specifically recommended for bruises, sprains, and strains rather than as a primary fracture fixation step[cite: 126, 142]",
    category: "Fractures"
  },
  {
    id: 35,
    q: "35. What is the purpose of a splint in fracture management?",
    options: [
      "To cure bacterial infections",
      "To increase blood pressure",
      "To cool down the skin",
      "To immobilize the injured part and prevent movement at the fracture site[cite: 144]"
    ],
    correctText: "To immobilize the injured part and prevent movement at the fracture site[cite: 144]",
    category: "Fractures"
  },
  {
    id: 36,
    q: "36. Why should open fractures be covered with a sterile dressing?",
    options: [
      "To hide the bone from view",
      "To warm up the limb",
      "To control bleeding and minimize the risk of infection[cite: 140]",
      "To straighten the bone automatically"
    ],
    correctText: "To control bleeding and minimize the risk of infection[cite: 140]",
    category: "Fractures"
  },
  {
    id: 37,
    q: "37. When should emergency medical help be sought for a fracture?",
    options: [
      "Never, fractures always heal at home",
      "For serious injuries like leg fractures, open fractures, or when self-transport is unsafe[cite: 144]",
      "Only after 3 weeks",
      "Only if the casualty falls asleep"
    ],
    correctText: "For serious injuries like leg fractures, open fractures, or when self-transport is unsafe[cite: 144]",
    category: "Fractures"
  },
  {
    id: 38,
    q: "38. How should a fractured leg be supported before medical help arrives?",
    options: [
      "Force them to stand up",
      "Apply a tourniquet tightly around the thigh",
      "Keep the casualty still, support joints above and below, and apply comfortable support or bandages[cite: 144]",
      "Immerse the leg in hot water"
    ],
    correctText: "Keep the casualty still, support joints above and below, and apply comfortable support or bandages[cite: 144]",
    category: "Fractures"
  },
  {
    id: 39,
    q: "39. What are the dangers of moving a person with a suspected spinal fracture?",
    options: [
      "It causes temporary hair discoloration",
      "It lowers body weight",
      "It has no associated dangers",
      "It can cause further damage to the spinal cord, risking permanent paralysis or severe nerve injury[cite: 67, 144]"
    ],
    correctText: "It can cause further damage to the spinal cord, risking permanent paralysis or severe nerve injury[cite: 67, 144]",
    category: "Fractures"
  },
  {
    id: 40,
    q: "40. Why should a person with a suspected skull and head injury be monitored closely?",
    options: [
      "Head injuries can cause a deterioration in the level of response and life-threatening complications[cite: 43]",
      "To check if their hair is growing",
      "To measure their hearing level",
      "Head injuries never change in severity"
    ],
    correctText: "Head injuries can cause a deterioration in the level of response and life-threatening complications[cite: 43]",
    category: "Fractures"
  },
  {
    id: 41,
    q: "41. What is a dislocation?",
    options: [
      "A complete fracture across the shaft of a long bone",
      "A minor skin abrasion",
      "Displacement of the bone ends that form a joint[cite: 142]",
      "A muscle cramp caused by cold"
    ],
    correctText: "Displacement of the bone ends that form a joint[cite: 142]",
    category: "Dislocations"
  },
  {
    id: 42,
    q: "42. How do dislocations differ from fractures?",
    options: [
      "A fracture is a break in the bone, whereas a dislocation involves displacement of bones at a joint[cite: 138, 142]",
      "A dislocation only affects blood vessels",
      "A fracture never causes pain",
      "They are identical terms"
    ],
    correctText: "A fracture is a break in the bone, whereas a dislocation involves displacement of bones at a joint[cite: 138, 142]",
    category: "Dislocations"
  },
  {
    id: 43,
    q: "43. What are the common causes of dislocations mentioned in the context?",
    options: [
      "Eating spicy food",
      "Reading in dim light",
      "Vitamin deficiency",
      "Sudden forces and sports-related joint trauma[cite: 142]"
    ],
    correctText: "Sudden forces and sports-related joint trauma[cite: 142]",
    category: "Dislocations"
  },
  {
    id: 44,
    q: "44. What joints are most commonly dislocated according to the text?",
    options: [
      "The shoulder joint, especially in athletes[cite: 142]",
      "The skull sutures",
      "The ribs",
      "The spinal vertebrae"
    ],
    correctText: "The shoulder joint, especially in athletes[cite: 142]",
    category: "Dislocations"
  },
  {
    id: 45,
    q: "45. Why is a shoulder dislocation common in athletes?",
    options: [
      "Because athletes have no ligaments",
      "The manual notes it is common in athletes due to joint mobility and forces, without extensive biomechanical elaboration[cite: 142]",
      "Due to wearing heavy shoes",
      "Because of low body temperature"
    ],
    correctText: "The manual notes it is common in athletes due to joint mobility and forces, without extensive biomechanical elaboration[cite: 142]",
    category: "Dislocations"
  },
  {
    id: 46,
    q: "46. How are recognition features of dislocations classified?",
    options: [
      "Cross-referenced alongside joint and bone damage chapters[cite: 137, 142]",
      "Listed as skin rashes",
      "Identified by fever symptoms only",
      "Not mentioned"
    ],
    correctText: "Cross-referenced alongside joint and bone damage chapters[cite: 137, 142]",
    category: "Dislocations"
  },
  {
    id: 47,
    q: "47. How does swelling occur in a dislocated joint?",
    options: [
      "Through localized tissue and blood vessel disruption around the injured joint[cite: 113, 142]",
      "Due to excessive water intake",
      "From sweating",
      "By inhaling dust"
    ],
    correctText: "Through localized tissue and blood vessel disruption around the injured joint[cite: 113, 142]",
    category: "Dislocations"
  },
  {
    id: 48,
    q: "48. What is emphasized regarding untreated dislocations?",
    options: [
      "They heal completely within 10 minutes on their own",
      "They turn into muscle strains",
      "They require proper medical care and should never be forcefully reset[cite: 142]",
      "They require immediate heat application"
    ],
    correctText: "They require proper medical care and should never be forcefully reset[cite: 142]",
    category: "Dislocations"
  },
  {
    id: 49,
    q: "49. Why should a dislocation never be forcefully reset?",
    options: [
      "It makes the bone too long",
      "Attempting to force it without medical help can cause further severe injury to nerves, blood vessels, and tissues[cite: 142]",
      "It changes eye color",
      "It cures the injury too fast"
    ],
    correctText: "Attempting to force it without medical help can cause further severe injury to nerves, blood vessels, and tissues[cite: 142]",
    category: "Dislocations"
  },
  {
    id: 50,
    q: "50. How are X-rays utilized for dislocations?",
    options: [
      "As hospital diagnostic procedures managed by medical teams[cite: 138, 142]",
      "Performed by first aiders with pocket devices",
      "Not used for joints",
      "Done outdoors"
    ],
    correctText: "As hospital diagnostic procedures managed by medical teams[cite: 138, 142]",
    category: "Dislocations"
  },
  {
    id: 51,
    q: "51. What is the first step in managing a dislocation?",
    options: [
      "Immobilize the joint in the position found and do not attempt to force it back[cite: 142]",
      "Pull the limb until it snaps back",
      "Apply boiling water",
      "Encourage heavy exercise"
    ],
    correctText: "Immobilize the joint in the position found and do not attempt to force it back[cite: 142]",
    category: "Dislocations"
  },
  {
    id: 52,
    q: "52. Why should a dislocated joint be immobilized?",
    options: [
      "To stop blood circulation completely",
      "To make the limb grow faster",
      "To cool down body temperature",
      "To prevent movement that would cause further pain and tissue damage[cite: 142]"
    ],
    correctText: "To prevent movement that would cause further pain and tissue damage[cite: 142]",
    category: "Dislocations"
  },
  {
    id: 53,
    q: "53. How can ice help in a dislocation injury?",
    options: [
      "By freezing the joint solid",
      "By curing infections instantly",
      "Cold compresses help reduce blood flow, minimize swelling, and relieve pain[cite: 126, 142]",
      "By straightening the bone"
    ],
    correctText: "Cold compresses help reduce blood flow, minimize swelling, and relieve pain[cite: 126, 142]",
    category: "Dislocations"
  },
  {
    id: 54,
    q: "54. When should emergency medical help be sought for a dislocation?",
    options: [
      "Never",
      "When professional medical relocation or hospital treatment is required[cite: 142]",
      "After 2 weeks of waiting",
      "Only if the person is under 5 years old"
    ],
    correctText: "When professional medical relocation or hospital treatment is required[cite: 142]",
    category: "Dislocations"
  },
  {
    id: 55,
    q: "55. Why is it important to check for circulation in a dislocated limb?",
    options: [
      "To ensure blood flow to distal parts of the limb has not been compromised by injury or tight bandages[cite: 117, 142]",
      "To check heart rate speed",
      "To measure body weight",
      "To test skin color preferences"
    ],
    correctText: "To ensure blood flow to distal parts of the limb has not been compromised by injury or tight bandages[cite: 117, 142]",
    category: "Dislocations"
  },
  {
    id: 56,
    q: "56. What is the danger of attempting to relocate a dislocated joint without medical help?",
    options: [
      "None at all",
      "Improved flexibility",
      "Risk of additional damage to blood vessels, nerves, and bone structures[cite: 142]",
      "Faster healing"
    ],
    correctText: "Risk of additional damage to blood vessels, nerves, and bone structures[cite: 142]",
    category: "Dislocations"
  },
  {
    id: 57,
    q: "57. How should a dislocated shoulder be supported?",
    options: [
      "By hanging heavy weights from the wrist",
      "By rotating the arm in circles continuously",
      "Using a sling or supportive bandages to keep the joint immobilized[cite: 142]",
      "Leaving the arm unsupported"
    ],
    correctText: "Using a sling or supportive bandages to keep the joint immobilized[cite: 142]",
    category: "Dislocations"
  },
  {
    id: 58,
    q: "58. What general precautions apply when dealing with hip dislocations?",
    options: [
      "Force the person to walk home",
      "Apply hot packs",
      "Massage the hip vigorously",
      "Minimize movement and arrange urgent medical transport[cite: 137, 142]"
    ],
    correctText: "Minimize movement and arrange urgent medical transport[cite: 137, 142]",
    category: "Dislocations"
  },
  {
    id: 59,
    q: "59. How does rest contribute to the healing of a dislocated joint?",
    options: [
      "It stops breathing",
      "It increases heart rate",
      "It causes muscle atrophy",
      "It prevents aggravation and allows damaged supporting tissues to recover[cite: 137, 142]"
    ],
    correctText: "It prevents aggravation and allows damaged supporting tissues to recover[cite: 137, 142]",
    category: "Dislocations"
  },
  {
    id: 60,
    q: "60. Why might a sling be used for a dislocated shoulder?",
    options: [
      "To cure headaches",
      "To support the arm and immobilize the joint to prevent painful movement during transport[cite: 142]",
      "To check blood pressure",
      "To cool down fever"
    ],
    correctText: "To support the arm and immobilize the joint to prevent painful movement during transport[cite: 142]",
    category: "Dislocations"
  },
  {
    id: 61,
    q: "61. What is a sprain?",
    options: [
      "A fracture of the skull",
      "A burn caused by chemicals",
      "The stretching or tearing of ligaments around a joint[cite: 44, 142]",
      "An infection of the throat"
    ],
    correctText: "The stretching or tearing of ligaments around a joint[cite: 44, 142]",
    category: "Sprains & Strains"
  },
  {
    id: 62,
    q: "62. How does a sprain differ from a strain?",
    options: [
      "Sprains involve ligaments (bone to bone), while strains involve muscles or tendons[cite: 136, 142]",
      "Strains only happen in bones",
      "Sprains affect muscles exclusively",
      "There is no difference"
    ],
    correctText: "Sprains involve ligaments (bone to bone), while strains involve muscles or tendons[cite: 136, 142]",
    category: "Sprains & Strains"
  },
  {
    id: 63,
    q: "63. What are the common causes of sprains?",
    options: [
      "Twisting falls or sudden awkward movements stretching or tearing joint ligaments[cite: 45, 142]",
      "Loud music",
      "Eating too much sugar",
      "Vitamin deficiency"
    ],
    correctText: "Twisting falls or sudden awkward movements stretching or tearing joint ligaments[cite: 45, 142]",
    category: "Sprains & Strains"
  },
  {
    id: 64,
    q: "64. What joints are most commonly affected by sprains?",
    options: [
      "The skull sutures",
      "The jaw joint",
      "The collarbone",
      "The ankle and knee joints[cite: 45, 142]"
    ],
    correctText: "The ankle and knee joints[cite: 45, 142]",
    category: "Sprains & Strains"
  },
  {
    id: 65,
    q: "65. How are sprain severity grades classified in the manual text?",
    options: [
      "Classified into mild, medium, and severe numerical scores",
      "Specific grading tiers (Grade 1, 2, 3) are not explicitly classified in the manual text",
      "Divided by body weight",
      "Classified by age groups"
    ],
    correctText: "Specific grading tiers (Grade 1, 2, 3) are not explicitly classified in the manual text",
    category: "Sprains & Strains"
  },
  {
    id: 66,
    q: "66. How does an ankle sprain typically occur?",
    options: [
      "From a direct gunshot wound",
      "From a chemical burn",
      "From electric shock",
      "From a twisting fall or rolling of the ankle[cite: 45, 142]"
    ],
    correctText: "From a twisting fall or rolling of the ankle[cite: 45, 142]",
    category: "Sprains & Strains"
  },
  {
    id: 67,
    q: "67. What is a strain?",
    options: [
      "An injury to a muscle or tendon resulting from over-stretching or overuse[cite: 44, 142]",
      "A break in a bone",
      "A tear in a ligament",
      "A skull fracture"
    ],
    correctText: "An injury to a muscle or tendon resulting from over-stretching or overuse[cite: 44, 142]",
    category: "Sprains & Strains"
  },
  {
    id: 68,
    q: "68. What are common causes of muscle strains?",
    options: [
      "Sudden over-exertion, twisting, or repetitive overuse of a muscle[cite: 44, 142]",
      "Cold weather alone",
      "Drinking milk",
      "Resting in bed"
    ],
    correctText: "Sudden over-exertion, twisting, or repetitive overuse of a muscle[cite: 44, 142]",
    category: "Sprains & Strains"
  },
  {
    id: 69,
    q: "69. How does overuse lead to strains?",
    options: [
      "By hardening the bones",
      "Continuous or repetitive stress causes micro-tears in the muscle or tendon[cite: 44, 142]",
      "By increasing skin sensitivity",
      "By lowering body weight"
    ],
    correctText: "Continuous or repetitive stress causes micro-tears in the muscle or tendon[cite: 44, 142]",
    category: "Sprains & Strains"
  },
  {
    id: 70,
    q: "70. What is the manual's guidance on pain relievers for sprains and strains?",
    options: [
      "First aid medication is generally confined to helping a casualty take their own recommended painkillers[cite: 24]",
      "First aiders should prescribe strong opioids",
      "Medication is strictly forbidden under all circumstances",
      "Painkillers must be injected intravenously"
    ],
    correctText: "First aid medication is generally confined to helping a casualty take their own recommended painkillers[cite: 24]",
    category: "Sprains & Strains"
  },
  {
    id: 71,
    q: "71. What are the complications of an untreated fracture?",
    options: [
      "Instant full recovery",
      "Increased muscle strength",
      "Enhanced bone density",
      "Poor healing, chronic pain, infection (in open fractures), and vessel/nerve damage[cite: 138, 140]"
    ],
    correctText: "Poor healing, chronic pain, infection (in open fractures), and vessel/nerve damage[cite: 138, 140]",
    category: "Fractures"
  },
  {
    id: 72,
    q: "72. How should you treat a second-degree burn according to the manual?",
    options: [
      "Apply butter or toothpaste immediately",
      "Burst all blisters with a needle",
      "Cool with cold running water for at least 10 minutes, remove jewelry before swelling, cover loosely with cling film/dressing",
      "Wrap tightly in wool bandages"
    ],
    correctText: "Cool with cold running water for at least 10 minutes, remove jewelry before swelling, cover loosely with cling film/dressing",
    category: "Medical Emergencies"
  },
  {
    id: 73,
    q: "73. What is the first aid for a person who has fainted?",
    options: [
      "Help them lie down, raise and support their legs above the heart level, ensure fresh air",
      "Force them to stand upright",
      "Pour hot coffee down their throat",
      "Slap their face hard"
    ],
    correctText: "Help them lie down, raise and support their legs above the heart level, ensure fresh air",
    category: "Medical Emergencies"
  },
  {
    id: 74,
    q: "74. How should you respond to a person who has been electrocuted?",
    options: [
      "Pull them away with bare wet hands",
      "Throw metal tools at them",
      "Ignore them until they wake up",
      "Never touch them while live; switch off power at mains or break contact with insulating material, then check ABC / CPR[cite: 34, 35, 56]"
    ],
    correctText: "Never touch them while live; switch off power at mains or break contact with insulating material, then check ABC / CPR[cite: 34, 35, 56]",
    category: "Medical Emergencies"
  },
  {
    id: 75,
    q: "75. How do you treat a casualty experiencing hypothermia?",
    options: [
      "Protect from cold, move to warm shelter, remove wet clothing and replace with dry garments/blankets",
      "Immerge them in boiling water",
      "Make them run a marathon",
      "Leave them outside in the snow"
    ],
    correctText: "Protect from cold, move to warm shelter, remove wet clothing and replace with dry garments/blankets",
    category: "Medical Emergencies"
  },
  {
    id: 76,
    q: "76. What is the first aid procedure for a drowning victim?",
    options: [
      "Rescue safely, check response/breathing, give 5 initial rescue breaths if unresponsive, then CPR at 30:2 ratio and call 999/112[cite: 37, 102]",
      "Roll them upside down by their ankles for an hour",
      "Give them swimming lessons",
      "Leave them on the beach unattended"
    ],
    correctText: "Rescue safely, check response/breathing, give 5 initial rescue breaths if unresponsive, then CPR at 30:2 ratio and call 999/112[cite: 37, 102]",
    category: "Medical Emergencies"
  },
  {
    id: 77,
    q: "77. How would you handle a situation where a person has severe chest pain?",
    options: [
      "Tell them to exercise vigorously",
      "Give them a heavy meal",
      "Ignore it as muscle fatigue",
      "Help them sit down comfortably, keep them calm, reassure them, and call 999/112 immediately"
    ],
    correctText: "Help them sit down comfortably, keep them calm, reassure them, and call 999/112 immediately",
    category: "Medical Emergencies"
  },
  {
    id: 78,
    q: "78. What actions should be taken if you find a man collapse who is unconscious but breathing (Practical)?",
    options: [
      "Ensure safety, check response, open airway, check breathing for up to 10s, place in recovery position, call 999/112[cite: 28, 46, 62, 65]",
      "Leave him alone and walk away",
      "Pour water on his face",
      "Start chest compressions immediately while he is breathing normally"
    ],
    correctText: "Ensure safety, check response, open airway, check breathing for up to 10s, place in recovery position, call 999/112[cite: 28, 46, 62, 65]",
    category: "Medical Emergencies"
  },
  {
    id: 79,
    q: "79. What safety precautions should you take at a car accident pedestrian strike scene (Practical)?",
    options: [
      "Run into traffic without precautions",
      "Take photos for social media first",
      "Park safely, set hazard lights, wear high-visibility jacket, set up warning triangles at least 45 m away in both directions[cite: 28, 30]",
      "Move damaged cars by hand"
    ],
    correctText: "Park safely, set hazard lights, wear high-visibility jacket, set up warning triangles at least 45 m away in both directions[cite: 28, 30]",
    category: "General Principles"
  },
  {
    id: 80,
    q: "80. How do you help a restaurant customer with a severe choking obstruction (Practical)?",
    options: [
      "Give up to 5 back blows between shoulder blades, then up to 5 abdominal thrusts if needed, rechecking mouth between steps[cite: 96]",
      "Offer them a sandwich",
      "Tell them to shout loudly",
      "Hit them on top of the head"
    ],
    correctText: "Give up to 5 back blows between shoulder blades, then up to 5 abdominal thrusts if needed, rechecking mouth between steps[cite: 96]",
    category: "Medical Emergencies"
  }
];
