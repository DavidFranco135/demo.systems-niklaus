// ============================================================
// seed_demo.ts — Popula o Firebase do projeto DEMO
//
// COMO USAR:
//   1. Copie este arquivo para a raiz do projeto demo
//   2. Certifique-se que o firebase.ts aponta para o projeto DEMO
//   3. Rode no terminal: npx tsx seed_demo.ts
//      (ou: npx ts-node seed_demo.ts)
//   4. Aguarde "✅ Seed concluído!" aparecer
//   5. Delete este arquivo — não precisa mais dele
// ============================================================

import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc, collection, addDoc } from 'firebase/firestore';

// ── Cole aqui as credenciais do seu projeto DEMO no Firebase ──
const firebaseConfig = {
  apiKey: "AIzaSyCbe9GJygUvifFY6MR8N8m-sJh8ceGWOLU",
  authDomain: "barbearia-premium-demo.firebaseapp.com",
  projectId: "barbearia-premium-demo",
  storageBucket: "barbearia-premium-demo.firebasestorage.app",
  messagingSenderId: "972303217678",
  appId: "1:972303217678:web:c3204ee2201bfed1e6785f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ── Helper de datas ───────────────────────────────────────────
const d = (offsetDays: number): string => {
  const dt = new Date();
  dt.setDate(dt.getDate() + offsetDays);
  return dt.toISOString().split('T')[0];
};

// ─────────────────────────────────────────────────────────────
// DADOS DE SEED
// ─────────────────────────────────────────────────────────────

const CONFIG = {
  name: 'Barbearia Premium',
  description: 'Referência em São Paulo desde 2005. Unimos a tradição da barbearia clássica com as técnicas mais modernas de visagismo masculino.',
  aboutTitle: 'Nossa História',
  aboutText: 'Nascemos de uma paixão pelo cuidado masculino de verdade. Hoje somos referência em corte, barba e estética, com uma equipe de profissionais altamente treinados.',
  address: 'Av. Paulista, 1234 — Bela Vista',
  city: 'São Paulo',
  state: 'SP',
  whatsapp: '5511999990000',
  instagram: '@barbeariapremium',
  logo: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=300&auto=format&fit=crop',
  coverImage: 'https://images.unsplash.com/photo-1521490683712-35a1cb235d1c?q=80&w=2000&auto=format&fit=crop',
  loginBackground: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2000&auto=format&fit=crop',
  heroBackground: 'https://images.unsplash.com/photo-1521490683712-35a1cb235d1c?q=80&w=2000&auto=format&fit=crop',
  aboutImage: 'https://images.unsplash.com/photo-1599351431247-f13b283253c9?q=80&w=800&auto=format&fit=crop',
  locationImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop',
  locationUrl: 'https://maps.google.com',
  openingTime: '09:00',
  closingTime: '20:00',
  email: 'contato@barbeariapremium.com.br',
  phone: '(11) 99999-0000',
  cnpj: '12.345.678/0001-99',
  cashbackPercent: 5,
  stampsForFreeCut: 10,
  masterBarberSurcharge: 15,
  benefitValidityDays: 7,
  adminName: 'Ricardo Mendes',
  gallery: [
    'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512690196252-741ef294f260?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop',
  ],
  reviews: [
    { id: 'r1', userName: 'Felipe Andrade', rating: 5, comment: 'Melhor barbearia que já fui! Atendimento impecável e o corte ficou perfeito.', date: '2024-11-10' },
    { id: 'r2', userName: 'Bruno Carvalho', rating: 5, comment: 'O sistema de agendamento online é muito prático. Ser lembrado pelo WhatsApp faz toda a diferença.', date: '2024-11-18' },
    { id: 'r3', userName: 'Thiago Monteiro', rating: 5, comment: 'Barba modelada perfeita! O barbeiro Master é simplesmente o melhor. Valeu cada centavo.', date: '2024-12-02' },
    { id: 'r4', userName: 'Lucas Ferreira', rating: 4, comment: 'Espaço muito bem cuidado. O programa de fidelidade é um diferencial enorme.', date: '2024-12-15' },
    { id: 'r5', userName: 'Gabriel Souza', rating: 5, comment: 'Plano VIP vale demais. Pago uma vez no mês e corto quantas vezes precisar.', date: '2025-01-05' },
  ],
  vipPlans: [
    { id: 'vip1', name: 'Plano Clássico', price: 149, period: 'MENSAL', benefits: ['4 cortes por mês', 'Barba 2x por mês', 'Desconto 15% em produtos', 'Agendamento prioritário', 'Acesso ao clube de benefícios'], maxCuts: 4, vipCommissionPct: 50, status: 'ATIVO' },
    { id: 'vip2', name: 'Plano Premium', price: 249, period: 'MENSAL', benefits: ['Cortes ilimitados', 'Barba ilimitada', 'Desconto 25% em produtos', 'Agendamento VIP exclusivo', 'Acesso ao clube de benefícios', 'Massagem capilar mensal'], featured: true, status: 'ATIVO' },
    { id: 'vip3', name: 'Plano Anual Black', price: 1990, period: 'ANUAL', benefits: ['Cortes ilimitados o ano todo', 'Barba ilimitada', 'Desconto 30% em produtos', 'Agendamento VIP exclusivo', '2 meses grátis inclusos', 'Brinde de boas-vindas'], discount: 17, status: 'ATIVO' },
  ],
};

const SERVICES = [
  { id: 's1', name: 'Corte Clássico', price: 65, durationMinutes: 40, description: 'Corte tradicional com acabamento na navalha e toalha quente.', status: 'ATIVO', category: 'Cabelo', image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=500&auto=format&fit=crop' },
  { id: 's2', name: 'Corte Moderno', price: 75, durationMinutes: 45, description: 'Fade, undercut e texturizações que valorizam seu rosto.', status: 'ATIVO', category: 'Cabelo', image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=500&auto=format&fit=crop' },
  { id: 's3', name: 'Barba Completa', price: 55, durationMinutes: 40, description: 'Barboterapia com esfoliação, óleos essenciais e massagem facial.', status: 'ATIVO', category: 'Barba', image: 'https://images.unsplash.com/photo-1512690196252-741ef294f260?q=80&w=500&auto=format&fit=crop' },
  { id: 's4', name: 'Barba Express', price: 35, durationMinutes: 20, description: 'Aparagem e alinhamento rápido para o dia a dia.', status: 'ATIVO', category: 'Barba', image: 'https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?q=80&w=500&auto=format&fit=crop' },
  { id: 's5', name: 'Combo Corte + Barba', price: 110, durationMinutes: 75, description: 'Renovação completa: corte + barba com todos os acabamentos.', status: 'ATIVO', category: 'Combos', image: 'https://images.unsplash.com/photo-1599351431247-f13b283253c9?q=80&w=500&auto=format&fit=crop' },
  { id: 's6', name: 'Combo VIP Total', price: 160, durationMinutes: 100, description: 'Corte, barba, sobrancelha e hidratação capilar.', status: 'ATIVO', category: 'Combos', image: 'https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?q=80&w=500&auto=format&fit=crop' },
  { id: 's7', name: 'Pigmentação de Barba', price: 40, durationMinutes: 25, description: 'Cobre falhas e define contornos com pigmentação natural.', status: 'ATIVO', category: 'Estética', image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=500&auto=format&fit=crop' },
  { id: 's8', name: 'Design de Sobrancelha', price: 25, durationMinutes: 15, description: 'Modelagem masculina na pinça ou navalha.', status: 'ATIVO', category: 'Estética', image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=500&auto=format&fit=crop' },
  { id: 's9', name: 'Hidratação Capilar', price: 50, durationMinutes: 30, description: 'Tratamento com máscara de nutrição, vapor e finalização premium.', status: 'ATIVO', category: 'Tratamentos', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=500&auto=format&fit=crop' },
];

const PROFESSIONALS = [
  { id: 'p1', name: 'Ricardo Mendes', specialties: ['s1','s2','s3','s5','s6'], avatar: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=300&auto=format&fit=crop', commission: 60, likes: 47, specialty: 'Barbeiro Master', isMaster: true, masterSurcharge: 15, description: 'Mais de 15 anos de experiência. Especialista em visagismo masculino e barboterapia clássica.', workingHours: { start: '09:00', end: '20:00' } },
  { id: 'p2', name: 'Diego Santos', specialties: ['s1','s2','s3','s4','s5'], avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop', commission: 50, likes: 31, specialty: 'Especialista em Fade', description: 'Referência em cortes modernos e fade. Atualizado com as últimas tendências internacionais.', workingHours: { start: '09:00', end: '19:00' } },
  { id: 'p3', name: 'Marcos Oliveira', specialties: ['s1','s3','s4','s7','s8'], avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop', commission: 50, likes: 24, specialty: 'Especialista em Barba', description: 'Paixão pela arte da navalha. Especialista em barboterapia e pigmentação.', workingHours: { start: '10:00', end: '20:00' } },
  { id: 'p4', name: 'André Lima', specialties: ['s1','s2','s5','s9'], avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop', commission: 45, likes: 18, specialty: 'Estilista Capilar', description: 'Especializado em tratamentos capilares e cortes que valorizam a saúde dos fios.', workingHours: { start: '09:00', end: '18:00' } },
];

const CLIENTS = [
  { id: 'c1', name: 'Carlos Eduardo', phone: '11991110001', email: 'carlos@email.com', password: '1234', totalSpent: 1840, lastVisit: d(-7), createdAt: '2023-03-15T10:00:00Z', gender: 'M', city: 'São Paulo' },
  { id: 'c2', name: 'Rafael Almeida', phone: '11991110002', email: 'rafael@email.com', password: '1234', totalSpent: 1540, lastVisit: d(-7), createdAt: '2023-05-20T10:00:00Z', gender: 'M', city: 'São Paulo' },
  { id: 'c3', name: 'Bruno Martins', phone: '11991110003', email: 'bruno@email.com', password: '1234', totalSpent: 1320, lastVisit: d(-10), createdAt: '2023-07-10T10:00:00Z', gender: 'M', city: 'São Paulo' },
  { id: 'c4', name: 'Thiago Costa', phone: '11991110004', email: 'thiago@email.com', password: '1234', totalSpent: 980, lastVisit: d(-12), createdAt: '2023-09-01T10:00:00Z', gender: 'M', city: 'São Paulo' },
  { id: 'c5', name: 'Leandro Pires', phone: '11991110005', email: 'leandro@email.com', password: '1234', totalSpent: 860, lastVisit: d(-15), createdAt: '2024-01-15T10:00:00Z', gender: 'M', city: 'São Paulo' },
  { id: 'c6', name: 'Felipe Rocha', phone: '11991110006', email: 'felipe@email.com', password: '1234', totalSpent: 720, lastVisit: d(-20), createdAt: '2024-02-10T10:00:00Z', gender: 'M', city: 'São Paulo' },
  { id: 'c7', name: 'Gustavo Neves', phone: '11991110007', email: 'gustavo@email.com', password: '1234', totalSpent: 610, lastVisit: d(-25), createdAt: '2024-03-05T10:00:00Z', gender: 'M', city: 'São Paulo' },
  { id: 'c8', name: 'Igor Batista', phone: '11991110008', email: 'igor@email.com', password: '1234', totalSpent: 480, lastVisit: d(-28), createdAt: '2024-04-20T10:00:00Z', gender: 'M', city: 'São Paulo' },
  { id: 'c9', name: 'Matheus Cardoso', phone: '11991110009', email: 'matheus@email.com', password: '1234', totalSpent: 390, lastVisit: d(-30), createdAt: '2024-05-10T10:00:00Z', gender: 'M', city: 'São Paulo' },
  { id: 'c10', name: 'Pedro Henrique', phone: '11991110010', email: 'pedro@email.com', password: '1234', totalSpent: 310, lastVisit: d(-35), createdAt: '2024-06-01T10:00:00Z', gender: 'M', city: 'São Paulo' },
];

const APPOINTMENTS = [
  { id: 'a1', clientId: 'c1', clientName: 'Carlos Eduardo', clientPhone: '11991110001', serviceId: 's5', serviceName: 'Combo Corte + Barba', professionalId: 'p1', professionalName: 'Ricardo Mendes', date: d(0), startTime: '09:00', endTime: '10:15', status: 'CONCLUIDO_PAGO', price: 125, totalPrice: 125, paymentMethod: 'PIX' },
  { id: 'a2', clientId: 'c2', clientName: 'Rafael Almeida', clientPhone: '11991110002', serviceId: 's2', serviceName: 'Corte Moderno', professionalId: 'p2', professionalName: 'Diego Santos', date: d(0), startTime: '10:00', endTime: '10:45', status: 'CONCLUIDO_PAGO', price: 75, totalPrice: 75, paymentMethod: 'CARTAO' },
  { id: 'a3', clientId: 'c3', clientName: 'Bruno Martins', clientPhone: '11991110003', serviceId: 's3', serviceName: 'Barba Completa', professionalId: 'p3', professionalName: 'Marcos Oliveira', date: d(0), startTime: '11:00', endTime: '11:40', status: 'AGENDADO', price: 55, totalPrice: 55 },
  { id: 'a4', clientId: 'c4', clientName: 'Thiago Costa', clientPhone: '11991110004', serviceId: 's1', serviceName: 'Corte Clássico', professionalId: 'p1', professionalName: 'Ricardo Mendes', date: d(0), startTime: '14:00', endTime: '14:40', status: 'AGENDADO', price: 80, totalPrice: 80 },
  { id: 'a5', clientId: 'c5', clientName: 'Leandro Pires', clientPhone: '11991110005', serviceId: 's6', serviceName: 'Combo VIP Total', professionalId: 'p1', professionalName: 'Ricardo Mendes', date: d(0), startTime: '15:30', endTime: '17:10', status: 'AGENDADO', price: 175, totalPrice: 175 },
  { id: 'a6', clientId: 'c6', clientName: 'Felipe Rocha', clientPhone: '11991110006', serviceId: 's2', serviceName: 'Corte Moderno', professionalId: 'p2', professionalName: 'Diego Santos', date: d(1), startTime: '09:30', endTime: '10:15', status: 'AGENDADO', price: 75, totalPrice: 75 },
  { id: 'a7', clientId: 'c7', clientName: 'Gustavo Neves', clientPhone: '11991110007', serviceId: 's5', serviceName: 'Combo Corte + Barba', professionalId: 'p3', professionalName: 'Marcos Oliveira', date: d(1), startTime: '11:00', endTime: '12:15', status: 'AGENDADO', price: 110, totalPrice: 110 },
  { id: 'a8', clientId: 'c8', clientName: 'Igor Batista', clientPhone: '11991110008', serviceId: 's1', serviceName: 'Corte Clássico', professionalId: 'p4', professionalName: 'André Lima', date: d(3), startTime: '10:00', endTime: '10:40', status: 'AGENDADO', price: 65, totalPrice: 65 },
  { id: 'a9', clientId: 'c9', clientName: 'Matheus Cardoso', clientPhone: '11991110009', serviceId: 's3', serviceName: 'Barba Completa', professionalId: 'p2', professionalName: 'Diego Santos', date: d(4), startTime: '14:00', endTime: '14:40', status: 'AGENDADO', price: 55, totalPrice: 55 },
  { id: 'a10', clientId: 'c10', clientName: 'Pedro Henrique', clientPhone: '11991110010', serviceId: 's9', serviceName: 'Hidratação Capilar', professionalId: 'p4', professionalName: 'André Lima', date: d(5), startTime: '16:00', endTime: '16:30', status: 'AGENDADO', price: 50, totalPrice: 50 },
  { id: 'a11', clientId: 'c1', clientName: 'Carlos Eduardo', clientPhone: '11991110001', serviceId: 's6', serviceName: 'Combo VIP Total', professionalId: 'p1', professionalName: 'Ricardo Mendes', date: d(-7), startTime: '10:00', endTime: '11:40', status: 'CONCLUIDO_PAGO', price: 175, totalPrice: 175, paymentMethod: 'PIX' },
  { id: 'a12', clientId: 'c2', clientName: 'Rafael Almeida', clientPhone: '11991110002', serviceId: 's5', serviceName: 'Combo Corte + Barba', professionalId: 'p2', professionalName: 'Diego Santos', date: d(-7), startTime: '14:00', endTime: '15:15', status: 'CONCLUIDO_PAGO', price: 110, totalPrice: 110, paymentMethod: 'CARTAO' },
  { id: 'a13', clientId: 'c3', clientName: 'Bruno Martins', clientPhone: '11991110003', serviceId: 's2', serviceName: 'Corte Moderno', professionalId: 'p2', professionalName: 'Diego Santos', date: d(-10), startTime: '11:00', endTime: '11:45', status: 'CONCLUIDO_PAGO', price: 75, totalPrice: 75, paymentMethod: 'DINHEIRO' },
  { id: 'a14', clientId: 'c4', clientName: 'Thiago Costa', clientPhone: '11991110004', serviceId: 's3', serviceName: 'Barba Completa', professionalId: 'p3', professionalName: 'Marcos Oliveira', date: d(-12), startTime: '15:00', endTime: '15:40', status: 'CONCLUIDO_PAGO', price: 55, totalPrice: 55, paymentMethod: 'PIX' },
  { id: 'a15', clientId: 'c5', clientName: 'Leandro Pires', clientPhone: '11991110005', serviceId: 's1', serviceName: 'Corte Clássico', professionalId: 'p4', professionalName: 'André Lima', date: d(-15), startTime: '09:00', endTime: '09:40', status: 'CONCLUIDO_PAGO', price: 65, totalPrice: 65, paymentMethod: 'PIX' },
  { id: 'a16', clientId: 'c6', clientName: 'Felipe Rocha', clientPhone: '11991110006', serviceId: 's7', serviceName: 'Pigmentação de Barba', professionalId: 'p3', professionalName: 'Marcos Oliveira', date: d(-20), startTime: '13:00', endTime: '13:25', status: 'CONCLUIDO_PAGO', price: 40, totalPrice: 40, paymentMethod: 'PIX' },
  { id: 'a17', clientId: 'c1', clientName: 'Carlos Eduardo', clientPhone: '11991110001', serviceId: 's2', serviceName: 'Corte Moderno', professionalId: 'p1', professionalName: 'Ricardo Mendes', date: d(-21), startTime: '10:00', endTime: '10:45', status: 'CONCLUIDO_PAGO', price: 90, totalPrice: 90, paymentMethod: 'CARTAO' },
  { id: 'a18', clientId: 'c7', clientName: 'Gustavo Neves', clientPhone: '11991110007', serviceId: 's5', serviceName: 'Combo Corte + Barba', professionalId: 'p1', professionalName: 'Ricardo Mendes', date: d(-25), startTime: '16:00', endTime: '17:15', status: 'CONCLUIDO_PAGO', price: 125, totalPrice: 125, paymentMethod: 'PIX' },
  { id: 'a19', clientId: 'c8', clientName: 'Igor Batista', clientPhone: '11991110008', serviceId: 's3', serviceName: 'Barba Completa', professionalId: 'p3', professionalName: 'Marcos Oliveira', date: d(-28), startTime: '14:30', endTime: '15:10', status: 'CONCLUIDO_PAGO', price: 55, totalPrice: 55, paymentMethod: 'DINHEIRO' },
  { id: 'a20', clientId: 'c2', clientName: 'Rafael Almeida', clientPhone: '11991110002', serviceId: 's9', serviceName: 'Hidratação Capilar', professionalId: 'p4', professionalName: 'André Lima', date: d(-30), startTime: '11:30', endTime: '12:00', status: 'CONCLUIDO_PAGO', price: 50, totalPrice: 50, paymentMethod: 'PIX' },
];

const FINANCIAL = [
  { id: 'f1', appointmentId: 'a1', description: 'Combo Corte + Barba — Carlos Eduardo', amount: 125, type: 'RECEITA', date: d(0), category: 'Serviço' },
  { id: 'f2', appointmentId: 'a2', description: 'Corte Moderno — Rafael Almeida', amount: 75, type: 'RECEITA', date: d(0), category: 'Serviço' },
  { id: 'f3', appointmentId: 'a11', description: 'Combo VIP Total — Carlos Eduardo', amount: 175, type: 'RECEITA', date: d(-7), category: 'Serviço' },
  { id: 'f4', appointmentId: 'a12', description: 'Combo Corte + Barba — Rafael Almeida', amount: 110, type: 'RECEITA', date: d(-7), category: 'Serviço' },
  { id: 'f5', appointmentId: 'a13', description: 'Corte Moderno — Bruno Martins', amount: 75, type: 'RECEITA', date: d(-10), category: 'Serviço' },
  { id: 'f6', appointmentId: 'a14', description: 'Barba Completa — Thiago Costa', amount: 55, type: 'RECEITA', date: d(-12), category: 'Serviço' },
  { id: 'f7', appointmentId: 'a15', description: 'Corte Clássico — Leandro Pires', amount: 65, type: 'RECEITA', date: d(-15), category: 'Serviço' },
  { id: 'f8', appointmentId: 'a16', description: 'Pigmentação — Felipe Rocha', amount: 40, type: 'RECEITA', date: d(-20), category: 'Serviço' },
  { id: 'f9', appointmentId: 'a17', description: 'Corte Moderno — Carlos Eduardo', amount: 90, type: 'RECEITA', date: d(-21), category: 'Serviço' },
  { id: 'f10', appointmentId: 'a18', description: 'Combo Corte + Barba — Gustavo Neves', amount: 125, type: 'RECEITA', date: d(-25), category: 'Serviço' },
  { id: 'f11', appointmentId: 'a19', description: 'Barba Completa — Igor Batista', amount: 55, type: 'RECEITA', date: d(-28), category: 'Serviço' },
  { id: 'f12', appointmentId: 'a20', description: 'Hidratação Capilar — Rafael Almeida', amount: 50, type: 'RECEITA', date: d(-30), category: 'Serviço' },
  { id: 'f13', description: 'Assinatura VIP Premium — Carlos Eduardo', amount: 249, type: 'RECEITA', date: d(-5), category: 'Assinatura VIP' },
  { id: 'f14', description: 'Assinatura Plano Clássico — Rafael Almeida', amount: 149, type: 'RECEITA', date: d(-8), category: 'Assinatura VIP' },
  { id: 'f15', description: 'Assinatura Plano Clássico — Bruno Martins', amount: 149, type: 'RECEITA', date: d(-12), category: 'Assinatura VIP' },
  { id: 'f16', description: 'Venda — Pomada Modeladora Black', amount: 65, type: 'RECEITA', date: d(-3), category: 'Produto' },
  { id: 'f17', description: 'Venda — Óleo para Barba Premium', amount: 89, type: 'RECEITA', date: d(-9), category: 'Produto' },
  { id: 'f18', description: 'Aluguel do espaço — mês atual', amount: 3500, type: 'DESPESA', date: d(-25), category: 'Aluguel' },
  { id: 'f19', description: 'Reposição de produtos e insumos', amount: 480, type: 'DESPESA', date: d(-18), category: 'Insumos' },
  { id: 'f20', description: 'Energia elétrica', amount: 320, type: 'DESPESA', date: d(-15), category: 'Utilidades' },
  { id: 'f21', description: 'Internet e streaming ambiente', amount: 180, type: 'DESPESA', date: d(-15), category: 'Utilidades' },
  { id: 'f22', description: 'Material de limpeza', amount: 95, type: 'DESPESA', date: d(-10), category: 'Insumos' },
];

const PARTNERS = [
  { id: 'par1', name: 'João Açaí', businessName: 'Açaí do João', phone: '11988880001', email: 'joao@acai.com', discount: 15, cashbackPercent: 5, qrCodeToken: 'demo-acai-001', qrCodeExpiry: d(30), totalReferrals: 42, status: 'ATIVO', createdAt: new Date().toISOString(), category: 'Açaí', description: 'O melhor açaí do bairro! 15% de desconto para clientes da Barbearia Premium.', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=800&auto=format&fit=crop' },
  { id: 'par2', name: 'Marco Burguer', businessName: 'Marco Burguer', phone: '11988880002', email: 'marco@burguer.com', discount: 10, cashbackPercent: 3, qrCodeToken: 'demo-burg-002', qrCodeExpiry: d(30), totalReferrals: 28, status: 'ATIVO', createdAt: new Date().toISOString(), category: 'Hamburgueria', description: 'Burgers artesanais premium. Desconto especial para quem vem do barbeiro!', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop' },
  { id: 'par3', name: 'FitClub Academia', businessName: 'FitClub Academia', phone: '11988880003', email: 'fitclub@email.com', discount: 20, cashbackPercent: 0, qrCodeToken: 'demo-fit-003', qrCodeExpiry: d(30), totalReferrals: 15, status: 'ATIVO', createdAt: new Date().toISOString(), category: 'Academia', description: '20% OFF na matrícula para clientes Premium.', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop' },
];

const LOYALTY_CARDS = [
  { id: 'loy1', clientId: 'c1', stamps: 7, totalStamps: 10, credits: 45.50, freeCutsEarned: 2, freeCutsPending: 0, createdAt: '2023-03-15T10:00:00Z', updatedAt: new Date().toISOString() },
  { id: 'loy2', clientId: 'c2', stamps: 5, totalStamps: 10, credits: 28.00, freeCutsEarned: 1, freeCutsPending: 0, createdAt: '2023-05-20T10:00:00Z', updatedAt: new Date().toISOString() },
  { id: 'loy3', clientId: 'c3', stamps: 9, totalStamps: 10, credits: 15.00, freeCutsEarned: 1, freeCutsPending: 1, createdAt: '2023-07-10T10:00:00Z', updatedAt: new Date().toISOString() },
  { id: 'loy4', clientId: 'c4', stamps: 3, totalStamps: 10, credits: 8.25, freeCutsEarned: 0, freeCutsPending: 0, createdAt: '2023-09-01T10:00:00Z', updatedAt: new Date().toISOString() },
  { id: 'loy5', clientId: 'c5', stamps: 6, totalStamps: 10, credits: 19.50, freeCutsEarned: 1, freeCutsPending: 0, createdAt: '2024-01-15T10:00:00Z', updatedAt: new Date().toISOString() },
];

const SUBSCRIPTIONS = [
  { id: 'sub1', clientId: 'c1', clientName: 'Carlos Eduardo', planId: 'vip2', planName: 'Plano Premium', price: 249, startDate: d(-30), endDate: d(0), status: 'ATIVA', usageCount: 6, cutsThisPeriod: 6, periodStartDate: d(-30), paymentHistory: [{ id: 'ph1', date: d(-30), amount: 249, method: 'PIX', status: 'PAGO' }], createdAt: d(-30) },
  { id: 'sub2', clientId: 'c2', clientName: 'Rafael Almeida', planId: 'vip1', planName: 'Plano Clássico', price: 149, startDate: d(-25), endDate: d(5), status: 'ATIVA', usageCount: 3, usageLimit: 4, cutsThisPeriod: 3, periodStartDate: d(-25), paymentHistory: [{ id: 'ph2', date: d(-25), amount: 149, method: 'CARTAO', status: 'PAGO' }], createdAt: d(-25) },
  { id: 'sub3', clientId: 'c3', clientName: 'Bruno Martins', planId: 'vip1', planName: 'Plano Clássico', price: 149, startDate: d(-20), endDate: d(10), status: 'ATIVA', usageCount: 2, usageLimit: 4, cutsThisPeriod: 2, periodStartDate: d(-20), paymentHistory: [{ id: 'ph3', date: d(-20), amount: 149, method: 'PIX', status: 'PAGO' }], createdAt: d(-20) },
];

const PRODUCTS = [
  { id: 'prod1', name: 'Pomada Modeladora Black', price: 65, category: 'Cabelo', description: 'Fixação forte, acabamento matte. Para estilos modernos e clássicos.', image: 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?q=80&w=400&auto=format&fit=crop', active: true, stock: 15 },
  { id: 'prod2', name: 'Óleo para Barba Premium', price: 89, category: 'Barba', description: 'Amacia, hidrata e dá brilho natural à barba. Aroma amadeirado sofisticado.', image: 'https://images.unsplash.com/photo-1621607512022-6aecc4fed814?q=80&w=400&auto=format&fit=crop', active: true, stock: 8 },
  { id: 'prod3', name: 'Shampoo Antiqueda', price: 75, category: 'Cabelo', description: 'Fórmula com cafeína e biotina. Fortalece os fios e estimula o crescimento.', image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=400&auto=format&fit=crop', active: true, stock: 12 },
  { id: 'prod4', name: 'Balm para Barba', price: 55, category: 'Barba', description: 'Condiciona e controla a barba. Ideal para uso diário.', image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=400&auto=format&fit=crop', active: true, stock: 10 },
];

// ─────────────────────────────────────────────────────────────
// FUNÇÃO PRINCIPAL DE SEED
// ─────────────────────────────────────────────────────────────
async function seed() {
  console.log('🚀 Iniciando seed do Firebase Demo...\n');

  // CONFIG
  console.log('📋 Salvando configurações da loja...');
  await setDoc(doc(db, 'config', 'main'), CONFIG);

  // SERVICES
  console.log('✂️  Salvando serviços...');
  for (const item of SERVICES) {
    await setDoc(doc(db, 'services', item.id), item);
  }

  // PROFESSIONALS
  console.log('👨 Salvando profissionais...');
  for (const item of PROFESSIONALS) {
    await setDoc(doc(db, 'professionals', item.id), item);
  }

  // CLIENTS
  console.log('👥 Salvando clientes...');
  for (const item of CLIENTS) {
    await setDoc(doc(db, 'clients', item.id), item);
  }

  // APPOINTMENTS
  console.log('📅 Salvando agendamentos...');
  for (const item of APPOINTMENTS) {
    await setDoc(doc(db, 'appointments', item.id), item);
  }

  // FINANCIAL
  console.log('💰 Salvando entradas financeiras...');
  for (const item of FINANCIAL) {
    await setDoc(doc(db, 'financialEntries', item.id), item);
  }

  // PARTNERS
  console.log('🤝 Salvando parceiros...');
  for (const item of PARTNERS) {
    await setDoc(doc(db, 'partners', item.id), item);
  }

  // LOYALTY CARDS
  console.log('🎯 Salvando cartões fidelidade...');
  for (const item of LOYALTY_CARDS) {
    await setDoc(doc(db, 'loyaltyCards', item.id), item);
  }

  // SUBSCRIPTIONS
  console.log('👑 Salvando assinaturas VIP...');
  for (const item of SUBSCRIPTIONS) {
    await setDoc(doc(db, 'subscriptions', item.id), item);
  }

  // PRODUCTS
  console.log('🛒 Salvando produtos...');
  for (const item of PRODUCTS) {
    await setDoc(doc(db, 'products', item.id), item);
  }

  console.log('\n✅ Seed concluído! O app demo está populado e pronto.');
  console.log('👉 Acesse o Firebase Console para confirmar os dados.');
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Erro no seed:', err);
  process.exit(1);
});
