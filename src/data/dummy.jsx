export default {
  firstName: 'Anna Lydia',
  lastName: 'Machado Silva',
  professionalTitle: 'Medical Student',
  address: 'Alameda Joaquim Eugênio de Lima, 113 - São Paulo, SP, Brazil 01403001',
  phone: '+55 11 99561-5195',
  email: 'annalms.113@gmail.com',
  themeColor: "#1a73e8",
  
  education: [
      {
          id: 1,
          universityName: 'Universidade Cidade de São Paulo - UNICID',
          startDate: 'Aug 2020',
          endDate: '2026',
          degree: 'Doctor of Medicine (MD)',
          currentlyStudying: true
      },
      {
          id: 2,
          universityName: 'Faculdade Israelita de Ciências da Saúde Albert Einstein',
          startDate: 'Jul 2018',
          endDate: 'Jun 2024',
          degree: 'Doctor of Medicine (MD)',
          currentlyStudying: true
      }
  ],
  
  workExperience: [
      {
          id: 1,
          title: 'Tutor de Aulas de Conversação',
          local: 'Medical English Academy',
          city: 'São Paulo',
          state: 'SP',
          country: 'Brazil',
          startDate: 'Aug 2023',
          endDate: '',
          currentlyWorking: true,
          workSummary: 'Auxiliei o instrutor principal na entrega do conteúdo do curso, facilitando um ambiente de aprendizado dinâmico para médicos e estudantes de medicina. Contribuí para o desenvolvimento de habilidades de comunicação médica em inglês.'
      },
      {
          id: 2,
          title: 'Pesquisadora Estudante',
          local: 'University of São Paulo (USP)',
          city: 'São Paulo',
          state: 'SP',
          country: 'Brazil',
          startDate: 'Aug 2021',
          endDate: 'Sep 2022',
          currentlyWorking: false,
          workSummary: 'Desenvolvi projeto científico sobre o efeito do controle do tronco em pessoas com lesão medular através de Estimulação Transcraniana por Corrente Contínua (tDCS) associada à Realidade Virtual (VR).'
      }
  ],
  
  researchExperience: [
      {
          id: 1,
          title: 'Projeto Científico sobre Estimulação Transcraniana',
          institution: 'University of São Paulo (USP)',
          city: 'São Paulo',
          state: 'SP',
          country: 'Brazil',
          startDate: 'Aug 2021',
          endDate: 'Sep 2022',
          currentlyWorking: false,
          description: 'Desenvolvi projeto científico sobre o efeito do controle do tronco em pessoas com lesão medular através de Estimulação Transcraniana por Corrente Contínua (tDCS) associada à Realidade Virtual (VR).'
      },
      {
          id: 2,
          title: 'Pesquisadora Estudante',
          institution: 'Hospital Israelita Albert Einstein',
          city: 'São Paulo',
          state: 'SP',
          country: 'Brazil',
          startDate: 'Nov 2018',
          endDate: '',
          currentlyWorking: true,
          description: 'Pesquisa em Reabilitação Pulmonar, VBHC e Cigarros Eletrônicos.'
      }
  ],
  
  extracurricularActivities: [
      {
          id: 1,
          activity: 'Interest Group in Neurosurgery - Educational Department',
          organization: 'Universidade Cidade de São Paulo (UNICID)',
          startDate: 'Feb 2021',
          endDate: '',
          city: 'São Paulo',
          state: 'SP',
          country: 'Brazil',
          currentlyWorking: true,
          description: 'Participação em rotações supervisionadas pelo Programa de Residência em Neurocirurgia no Hospital do Servidor Público Estadual (HSPE).'
      },
      {
          id: 2,
          activity: 'Journal Club',
          organization: 'Faculdade Israelita de Ciências da Saúde Albert Einstein',
          city: 'São Paulo',
          state: 'SP',
          country: 'Brazil',
          startDate: 'Apr 2021',
          endDate: 'May 2021',
          currentlyWorking: false,
          description: 'Participação em discussões semanais sobre artigos publicados e suas implicações práticas.'
      }
  ],
  
  skills: [
      {
          id: 1,
          name: 'Portuguese',
          rating: 5,
      },
      {
          id: 2,
          name: 'English',
          rating: 4,
      },
      {
          id: 3,
          name: 'Excel',
          rating: 4,
      },
      {
          id: 4,
          name: 'Python',
          rating: 3,
      }
  ],
  
  relevantCourses: [
      {
          id: 1,
          courseName: 'Neuroanatomy 3D course',
          institution: 'Faculdade Israelita de Ciências da Saúde Albert Einstein',
          date: 'Jul 2022',
          description: 'Curso de Neuroanatomia em 3D, abordando estruturas e funcionalidades neurológicas.'
      },
      {
          id: 2,
          courseName: 'Emergency Medicine training course',
          institution: 'São Paulo, SP, Brazil',
          date: 'Nov 2022',
          description: 'Curso teórico de 8 horas sobre Medicina de Emergência.'
      }
  ]
}