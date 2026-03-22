// Type definitions for Mother-Baby Registration (Cadastro Binômio)

export interface BinomioRegistrationData {
    // PARTE I: DADOS SOCIODEMOGRÁFICOS E MATERNOS
    idade_mae?: number;
    dt_nasc_mae?: string; // ISO date format
    etnia_mae?: string; // 1-Branca, 2-Preta, 3-Amarela, 4-Parda, 5-Indígena
    est_civil?: string; // 1-Solteira, 2-Casada, 3-Viúva, 4-Separada/Divorciada
    escol_mae?: string; // 0 a 14, 99
    renda?: string; // 1 a 6, 9
    cons_pn?: number; // Consultas pré-natal

    // HÁBITOS E SAÚDE
    tabagismo?: string; // 1-Sim, 2-Não
    tabagismo_freq?: number; // Cigarros por dia
    consumo_beb_alcoolica?: string; // 1 a 4, 9
    beb_alcoolica_dias?: number; // Dias por semana
    drogas?: string; // 1-Sim, 2-Não
    drogas_freq?: number; // Dias por semana
    medicacao_continua?: string; // 1-Sim, 2-Não
    medicacao_cont_qual?: string; // Descrição

    // SAÚDE MENTAL E FÍSICA
    psico_mae?: string; // Múltipla escolha (1-10), ex: "1,3,5"
    obesid_mae?: string; // 1-Sim, 2-Não
    desnutri_mae?: string; // 1-Sim, 2-Não

    // ANTECEDENTES CLÍNICOS
    dm_previa?: string;
    dm_gest?: string;
    has_previa?: string;
    has_gestacional?: string;
    bariatrica?: string;
    dist_tireoide?: string; // 1-Hipo, 2-Hiper, 3-Não
    cirurgia_mam?: string;
    cirurgia_mam_qual?: string; // Múltipla escolha
    cancer_mama?: string;

    // HISTÓRICO OBSTÉTRICO E APOIO
    paridade?: string; // 1-Primípara, 2-Multípara
    amam_ant?: string;
    apoio?: string; // Múltipla escolha
    curso_amament?: string; // Múltipla escolha
    propaganda_formula?: string;
    concep?: string; // 1-Natural, 2-Reprodução assistida

    // DADOS DO PARTO E DO BEBÊ
    dt_parto?: string; // ISO date format
    loc_parto?: string; // 1-Hospital, 2-Casa, 3-Outro
    ihac?: string; // Hospital Amigo da Criança
    tp_parto?: string; // 1-Normal, 2-Fórceps, 3-Eletiva, 4-Urgência
    sexo?: string; // 1-Masc, 2-Fem
    id_gest_sem?: number; // Semanas
    id_gest_dias?: number; // Dias
    peso_nasc?: number; // Gramas
    apgar1?: number; // 0 a 10
    apgar5?: number; // 0 a 10
    aloj_conj?: string;
    canguru?: string;

    // ANATOMIA E AMAMENTAÇÃO INICIAL
    formato_mamas?: string;
    formato_mamilo?: string;
    prim_hora?: string; // Amamentou na 1ª hora
    amament_24h_cadastro?: string;
    outr_liq_24h_cadastro?: string;

    // DISPOSITIVOS E DIFICULDADES (BASELINE)
    disposit_cadastro?: string; // Múltipla escolha (1-9)
    mamadeira_cadastro?: string;
    dificuldade_cadastro?: string; // Múltipla escolha (0-16)
    chupeta_cadastro?: string;

    // ESCALAS E AVALIAÇÕES CLÍNICAS
    auto_efic_inicial?: number; // 14 a 70
    anquiloglossia?: string;
    icter_neo?: string;
    fototerapia?: string;
    fototerapia_dias?: number;

    // PARTE III: RETORNO AO TRABALHO
    ocup_mae?: string;
    retorno_trab?: string;
    tempo_retorno?: number; // Meses
    banco_leite_recebeu?: string;
    banco_leite_doou?: string;

    // Variáveis preenchidas no momento do retorno
    amament_contin?: string;
    amam_intencao_cont?: string;
    ordenha?: string;
    armazen_leite_mat?: string;
    aquecim_leite_mat?: string;
}

export interface BinomioFormStep1 {
    idade_mae?: number;
    dt_nasc_mae?: string;
    etnia_mae?: string;
    est_civil?: string;
    escol_mae?: string;
    renda?: string;
    cons_pn?: number;
}

export interface BinomioFormStep2 {
    tabagismo?: string;
    tabagismo_freq?: number;
    consumo_beb_alcoolica?: string;
    beb_alcoolica_dias?: number;
    drogas?: string;
    drogas_freq?: number;
    medicacao_continua?: string;
    medicacao_cont_qual?: string;
}

export interface BinomioFormStep3 {
    psico_mae?: string[];
    obesid_mae?: string;
    desnutri_mae?: string;
    dm_previa?: string;
    dm_gest?: string;
    has_previa?: string;
    has_gestacional?: string;
    bariatrica?: string;
    dist_tireoide?: string;
    cirurgia_mam?: string;
    cirurgia_mam_qual?: string;
    cancer_mama?: string;
}

export interface BinomioFormStep4 {
    paridade?: string;
    amam_ant?: string;
    apoio?: string[];
    curso_amament?: string[];
    propaganda_formula?: string;
    concep?: string;
}

export interface BinomioFormStep5 {
    dt_parto?: string;
    loc_parto?: string;
    ihac?: string;
    tp_parto?: string;
    sexo?: string;
    id_gest_sem?: number;
    id_gest_dias?: number;
    peso_nasc?: number;
    apgar1?: number;
    apgar5?: number;
    aloj_conj?: string;
    canguru?: string;
}

export interface BinomioFormStep6 {
    formato_mamas?: string;
    formato_mamilo?: string;
    prim_hora?: string;
    amament_24h_cadastro?: string;
    outr_liq_24h_cadastro?: string;
    disposit_cadastro?: string[];
    mamadeira_cadastro?: string;
    dificuldade_cadastro?: string[];
    chupeta_cadastro?: string;
    auto_efic_inicial?: number;
    anquiloglossia?: string;
    icter_neo?: string;
    fototerapia?: string;
    fototerapia_dias?: number;
    ocup_mae?: string;
    retorno_trab?: string;
    tempo_retorno?: number;
    banco_leite_recebeu?: string;
    banco_leite_doou?: string;
}

export interface UserCredentials {
    email: string;
    password: string;
    id_user_mae: number;
}

export interface BinomioRegistrationResponse {
    cadastro: {
        id_binomio: number;
        [key: string]: any;
    };
    userCredentials: UserCredentials;
}
