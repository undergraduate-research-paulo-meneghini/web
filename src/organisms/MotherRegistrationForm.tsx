import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormStepIndicator from '../components/FormStepIndicator';
import CredentialsModal from '../components/CredentialsModal';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Select from '../atoms/Select';
import Checkbox from '../atoms/Checkbox';
import Label from '../atoms/Label';
import binomioService from '../services/binomio.service';
import type { BinomioRegistrationData, UserCredentials } from '../types/binomio.types';

const STEPS = [
    { number: 1, title: 'Dados Sociodemográficos' },
    { number: 2, title: 'Hábitos e Saúde' },
    { number: 3, title: 'Histórico Clínico' },
    { number: 4, title: 'Histórico Obstétrico' },
    { number: 5, title: 'Dados do Parto' },
    { number: 6, title: 'Amamentação' },
];

export default function MotherRegistrationForm() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showCredentials, setShowCredentials] = useState(false);
    const [credentials, setCredentials] = useState<UserCredentials | null>(null);

    const [formData, setFormData] = useState<BinomioRegistrationData>({});

    const updateField = (field: keyof BinomioRegistrationData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (currentStep < 6) setCurrentStep(currentStep + 1);
    };

    const handlePrevious = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        try {
            // Convert array fields to comma-separated strings
            const submitData = { ...formData };
            if (Array.isArray(submitData.psico_mae)) {
                submitData.psico_mae = submitData.psico_mae.join(',');
            }
            if (Array.isArray(submitData.apoio)) {
                submitData.apoio = submitData.apoio.join(',');
            }
            if (Array.isArray(submitData.curso_amament)) {
                submitData.curso_amament = submitData.curso_amament.join(',');
            }
            if (Array.isArray(submitData.disposit_cadastro)) {
                submitData.disposit_cadastro = submitData.disposit_cadastro.join(',');
            }
            if (Array.isArray(submitData.dificuldade_cadastro)) {
                submitData.dificuldade_cadastro = submitData.dificuldade_cadastro.join(',');
            }

            const response = await binomioService.registerBinomio(submitData);

            // Show credentials modal with the returned credentials
            setCredentials(response.userCredentials);
            setShowCredentials(true);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao realizar cadastro');
        } finally {
            setLoading(false);
        }
    };

    const handleCloseCredentials = () => {
        setShowCredentials(false);
        navigate('/dashboard');
    };

    const renderStep = () => {
        const inputClass = "w-full px-4 py-2 bg-gray-100 border-0 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500";
        const labelClass = "block text-sm font-medium text-gray-700 mb-2";

        switch (currentStep) {
            case 1:
                return <Step1 formData={formData} updateField={updateField} inputClass={inputClass} labelClass={labelClass} />;
            case 2:
                return <Step2 formData={formData} updateField={updateField} inputClass={inputClass} labelClass={labelClass} />;
            case 3:
                return <Step3 formData={formData} updateField={updateField} inputClass={inputClass} labelClass={labelClass} />;
            case 4:
                return <Step4 formData={formData} updateField={updateField} inputClass={inputClass} labelClass={labelClass} />;
            case 5:
                return <Step5 formData={formData} updateField={updateField} inputClass={inputClass} labelClass={labelClass} />;
            case 6:
                return <Step6 formData={formData} updateField={updateField} inputClass={inputClass} labelClass={labelClass} />;
            default:
                return null;
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            {showCredentials && credentials && (
                <CredentialsModal
                    credentials={credentials}
                    onClose={handleCloseCredentials}
                />
            )}

            <FormStepIndicator currentStep={currentStep} steps={STEPS} />

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {error}
                </div>
            )}

            <div className="bg-white p-8 rounded-lg shadow-sm">
                {renderStep()}

                <div className="flex justify-between mt-8">
                    <Button
                        onClick={handlePrevious}
                        disabled={currentStep === 1}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                    >
                        Anterior
                    </Button>

                    {currentStep < 6 ? (
                        <Button
                            onClick={handleNext}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Próximo
                        </Button>
                    ) : (
                        <Button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                        >
                            {loading ? 'Enviando...' : 'Finalizar Cadastro'}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

// Step Components
function Step1({ formData, updateField, inputClass, labelClass }: any) {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Dados Sociodemográficos</h2>

            <div>
                <Label htmlFor="idade_mae" className={labelClass}>Idade da Mãe</Label>
                <Input
                    id="idade_mae"
                    type="number"
                    value={formData.idade_mae || ''}
                    onChange={(e) => updateField('idade_mae', parseInt(e.target.value))}
                    className={inputClass}
                />
            </div>

            <div>
                <Label htmlFor="dt_nasc_mae" className={labelClass}>Data de Nascimento</Label>
                <Input
                    id="dt_nasc_mae"
                    type="date"
                    value={formData.dt_nasc_mae || ''}
                    onChange={(e) => updateField('dt_nasc_mae', e.target.value)}
                    className={inputClass}
                />
            </div>

            <div>
                <Label htmlFor="etnia_mae" className={labelClass}>Etnia</Label>
                <Select
                    id="etnia_mae"
                    value={formData.etnia_mae || ''}
                    onChange={(e) => updateField('etnia_mae', e.target.value)}
                    className={inputClass}
                    options={[
                        { value: '1', label: 'Branca' },
                        { value: '2', label: 'Preta' },
                        { value: '3', label: 'Amarela' },
                        { value: '4', label: 'Parda' },
                        { value: '5', label: 'Indígena' },
                    ]}
                    placeholder="Selecione"
                />
            </div>

            <div>
                <Label htmlFor="est_civil" className={labelClass}>Estado Civil</Label>
                <Select
                    id="est_civil"
                    value={formData.est_civil || ''}
                    onChange={(e) => updateField('est_civil', e.target.value)}
                    className={inputClass}
                    options={[
                        { value: '1', label: 'Solteira' },
                        { value: '2', label: 'Casada' },
                        { value: '3', label: 'Viúva' },
                        { value: '4', label: 'Separada/Divorciada' },
                    ]}
                    placeholder="Selecione"
                />
            </div>

            <div>
                <Label htmlFor="escol_mae" className={labelClass}>Escolaridade (anos)</Label>
                <Input
                    id="escol_mae"
                    type="text"
                    value={formData.escol_mae || ''}
                    onChange={(e) => updateField('escol_mae', e.target.value)}
                    className={inputClass}
                    placeholder="0-14 ou 99"
                />
            </div>

            <div>
                <Label htmlFor="renda" className={labelClass}>Renda Familiar</Label>
                <Select
                    id="renda"
                    value={formData.renda || ''}
                    onChange={(e) => updateField('renda', e.target.value)}
                    className={inputClass}
                    options={[
                        { value: '1', label: 'Até 1 salário mínimo' },
                        { value: '2', label: '1-2 salários' },
                        { value: '3', label: '2-3 salários' },
                        { value: '4', label: '3-5 salários' },
                        { value: '5', label: '5-10 salários' },
                        { value: '6', label: 'Mais de 10 salários' },
                        { value: '9', label: 'Não informado' },
                    ]}
                    placeholder="Selecione"
                />
            </div>

            <div>
                <Label htmlFor="cons_pn" className={labelClass}>Consultas Pré-Natal</Label>
                <Input
                    id="cons_pn"
                    type="number"
                    value={formData.cons_pn || ''}
                    onChange={(e) => updateField('cons_pn', parseInt(e.target.value))}
                    className={inputClass}
                />
            </div>
        </div>
    );
}

function Step2({ formData, updateField, inputClass, labelClass }: any) {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Hábitos e Saúde</h2>

            <div>
                <Label htmlFor="tabagismo" className={labelClass}>Tabagismo</Label>
                <Select
                    id="tabagismo"
                    value={formData.tabagismo || ''}
                    onChange={(e) => updateField('tabagismo', e.target.value)}
                    className={inputClass}
                    options={[
                        { value: '1', label: 'Sim' },
                        { value: '2', label: 'Não' },
                    ]}
                    placeholder="Selecione"
                />
            </div>

            {formData.tabagismo === '1' && (
                <div>
                    <Label htmlFor="tabagismo_freq" className={labelClass}>Cigarros por dia</Label>
                    <Input
                        id="tabagismo_freq"
                        type="number"
                        value={formData.tabagismo_freq || ''}
                        onChange={(e) => updateField('tabagismo_freq', parseInt(e.target.value))}
                        className={inputClass}
                    />
                </div>
            )}

            <div>
                <Label htmlFor="consumo_beb_alcoolica" className={labelClass}>Consumo de Bebida Alcoólica</Label>
                <Select
                    id="consumo_beb_alcoolica"
                    value={formData.consumo_beb_alcoolica || ''}
                    onChange={(e) => updateField('consumo_beb_alcoolica', e.target.value)}
                    className={inputClass}
                    options={[
                        { value: '1', label: 'Nunca' },
                        { value: '2', label: 'Raramente' },
                        { value: '3', label: 'Ocasionalmente' },
                        { value: '4', label: 'Frequentemente' },
                        { value: '9', label: 'Não informado' },
                    ]}
                    placeholder="Selecione"
                />
            </div>

            {formData.consumo_beb_alcoolica && formData.consumo_beb_alcoolica !== '1' && (
                <div>
                    <Label htmlFor="beb_alcoolica_dias" className={labelClass}>Dias por semana</Label>
                    <Input
                        id="beb_alcoolica_dias"
                        type="number"
                        value={formData.beb_alcoolica_dias || ''}
                        onChange={(e) => updateField('beb_alcoolica_dias', parseInt(e.target.value))}
                        className={inputClass}
                    />
                </div>
            )}

            <div>
                <Label htmlFor="drogas" className={labelClass}>Uso de Drogas</Label>
                <Select
                    id="drogas"
                    value={formData.drogas || ''}
                    onChange={(e) => updateField('drogas', e.target.value)}
                    className={inputClass}
                    options={[
                        { value: '1', label: 'Sim' },
                        { value: '2', label: 'Não' },
                    ]}
                    placeholder="Selecione"
                />
            </div>

            {formData.drogas === '1' && (
                <div>
                    <Label htmlFor="drogas_freq" className={labelClass}>Dias por semana</Label>
                    <Input
                        id="drogas_freq"
                        type="number"
                        value={formData.drogas_freq || ''}
                        onChange={(e) => updateField('drogas_freq', parseInt(e.target.value))}
                        className={inputClass}
                    />
                </div>
            )}

            <div>
                <Label htmlFor="medicacao_continua" className={labelClass}>Medicação Contínua</Label>
                <Select
                    id="medicacao_continua"
                    value={formData.medicacao_continua || ''}
                    onChange={(e) => updateField('medicacao_continua', e.target.value)}
                    className={inputClass}
                    options={[
                        { value: '1', label: 'Sim' },
                        { value: '2', label: 'Não' },
                    ]}
                    placeholder="Selecione"
                />
            </div>

            {formData.medicacao_continua === '1' && (
                <div>
                    <Label htmlFor="medicacao_cont_qual" className={labelClass}>Qual medicação?</Label>
                    <Input
                        id="medicacao_cont_qual"
                        type="text"
                        value={formData.medicacao_cont_qual || ''}
                        onChange={(e) => updateField('medicacao_cont_qual', e.target.value)}
                        className={inputClass}
                    />
                </div>
            )}
        </div>
    );
}

function Step3({ formData, updateField, inputClass, labelClass }: any) {
    const psicoOptions = [
        { value: '1', label: 'Depressão' },
        { value: '2', label: 'Ansiedade' },
        { value: '3', label: 'Transtorno Bipolar' },
        { value: '4', label: 'Esquizofrenia' },
        { value: '5', label: 'Outros' },
    ];

    const togglePsico = (value: string) => {
        const current = (formData.psico_mae as string[]) || [];
        const updated = current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value];
        updateField('psico_mae', updated);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Histórico Clínico</h2>

            <div>
                <Label className={labelClass}>Condições Psicológicas</Label>
                <div className="space-y-2">
                    {psicoOptions.map((option) => (
                        <Checkbox
                            key={option.value}
                            value={option.value}
                            checked={((formData.psico_mae as string[]) || []).includes(option.value)}
                            onChange={() => togglePsico(option.value)}
                            label={option.label}
                        />
                    ))}
                </div>
            </div>

            <div>
                <Label htmlFor="obesid_mae" className={labelClass}>Obesidade</Label>
                <Select
                    id="obesid_mae"
                    value={formData.obesid_mae || ''}
                    onChange={(e) => updateField('obesid_mae', e.target.value)}
                    className={inputClass}
                    options={[
                        { value: '1', label: 'Sim' },
                        { value: '2', label: 'Não' },
                    ]}
                    placeholder="Selecione"
                />
            </div>

            <div>
                <Label htmlFor="desnutri_mae" className={labelClass}>Desnutrição</Label>
                <Select
                    id="desnutri_mae"
                    value={formData.desnutri_mae || ''}
                    onChange={(e) => updateField('desnutri_mae', e.target.value)}
                    className={inputClass}
                    options={[
                        { value: '1', label: 'Sim' },
                        { value: '2', label: 'Não' },
                    ]}
                    placeholder="Selecione"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="dm_previa" className={labelClass}>Diabetes Prévia</Label>
                    <Select
                        id="dm_previa"
                        value={formData.dm_previa || ''}
                        onChange={(e) => updateField('dm_previa', e.target.value)}
                        className={inputClass}
                        options={[
                            { value: '1', label: 'Sim' },
                            { value: '2', label: 'Não' },
                        ]}
                        placeholder="Selecione"
                    />
                </div>

                <div>
                    <Label htmlFor="dm_gest" className={labelClass}>Diabetes Gestacional</Label>
                    <Select
                        id="dm_gest"
                        value={formData.dm_gest || ''}
                        onChange={(e) => updateField('dm_gest', e.target.value)}
                        className={inputClass}
                        options={[
                            { value: '1', label: 'Sim' },
                            { value: '2', label: 'Não' },
                        ]}
                        placeholder="Selecione"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="has_previa" className={labelClass}>Hipertensão Prévia</Label>
                    <Select
                        id="has_previa"
                        value={formData.has_previa || ''}
                        onChange={(e) => updateField('has_previa', e.target.value)}
                        className={inputClass}
                        options={[
                            { value: '1', label: 'Sim' },
                            { value: '2', label: 'Não' },
                        ]}
                        placeholder="Selecione"
                    />
                </div>

                <div>
                    <Label htmlFor="has_gestacional" className={labelClass}>Hipertensão Gestacional</Label>
                    <Select
                        id="has_gestacional"
                        value={formData.has_gestacional || ''}
                        onChange={(e) => updateField('has_gestacional', e.target.value)}
                        className={inputClass}
                        options={[
                            { value: '1', label: 'Sim' },
                            { value: '2', label: 'Não' },
                        ]}
                        placeholder="Selecione"
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="bariatrica" className={labelClass}>Cirurgia Bariátrica</Label>
                <Select
                    id="bariatrica"
                    value={formData.bariatrica || ''}
                    onChange={(e) => updateField('bariatrica', e.target.value)}
                    className={inputClass}
                    options={[
                        { value: '1', label: 'Sim' },
                        { value: '2', label: 'Não' },
                    ]}
                    placeholder="Selecione"
                />
            </div>

            <div>
                <Label htmlFor="dist_tireoide" className={labelClass}>Distúrbio de Tireoide</Label>
                <Select
                    id="dist_tireoide"
                    value={formData.dist_tireoide || ''}
                    onChange={(e) => updateField('dist_tireoide', e.target.value)}
                    className={inputClass}
                    options={[
                        { value: '1', label: 'Hipotireoidismo' },
                        { value: '2', label: 'Hipertireoidismo' },
                        { value: '3', label: 'Não' },
                    ]}
                    placeholder="Selecione"
                />
            </div>

            <div>
                <Label htmlFor="cirurgia_mam" className={labelClass}>Cirurgia Mamária</Label>
                <Select
                    id="cirurgia_mam"
                    value={formData.cirurgia_mam || ''}
                    onChange={(e) => updateField('cirurgia_mam', e.target.value)}
                    className={inputClass}
                    options={[
                        { value: '1', label: 'Sim' },
                        { value: '2', label: 'Não' },
                    ]}
                    placeholder="Selecione"
                />
            </div>
        </div>
    );
}

function Step4({ formData, updateField, inputClass, labelClass }: any) {
    const apoioOptions = [
        { value: '1', label: 'Companheiro' },
        { value: '2', label: 'Família' },
        { value: '3', label: 'Amigos' },
        { value: '4', label: 'Profissionais de saúde' },
        { value: '5', label: 'Nenhum' },
    ];

    const cursoOptions = [
        { value: '1', label: 'Curso de gestante' },
        { value: '2', label: 'Orientação médica' },
        { value: '3', label: 'Orientação enfermagem' },
        { value: '4', label: 'Internet/Livros' },
        { value: '5', label: 'Nenhum' },
    ];

    const toggleApoio = (value: string) => {
        const current = (formData.apoio as string[]) || [];
        const updated = current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value];
        updateField('apoio', updated);
    };

    const toggleCurso = (value: string) => {
        const current = (formData.curso_amament as string[]) || [];
        const updated = current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value];
        updateField('curso_amament', updated);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Histórico Obstétrico e Apoio</h2>

            <div>
                <Label htmlFor="paridade" className={labelClass}>Paridade</Label>
                <Select
                    id="paridade"
                    value={formData.paridade || ''}
                    onChange={(e) => updateField('paridade', e.target.value)}
                    className={inputClass}
                    options={[
                        { value: '1', label: 'Primípara' },
                        { value: '2', label: 'Multípara' },
                    ]}
                    placeholder="Selecione"
                />
            </div>

            <div>
                <Label htmlFor="amam_ant" className={labelClass}>Amamentou Anteriormente?</Label>
                <Select
                    id="amam_ant"
                    value={formData.amam_ant || ''}
                    onChange={(e) => updateField('amam_ant', e.target.value)}
                    className={inputClass}
                    options={[
                        { value: '1', label: 'Sim' },
                        { value: '2', label: 'Não' },
                        { value: '3', label: 'Não se aplica' },
                    ]}
                    placeholder="Selecione"
                />
            </div>

            <div>
                <Label className={labelClass}>Rede de Apoio</Label>
                <div className="space-y-2">
                    {apoioOptions.map((option) => (
                        <Checkbox
                            key={option.value}
                            value={option.value}
                            checked={((formData.apoio as string[]) || []).includes(option.value)}
                            onChange={() => toggleApoio(option.value)}
                            label={option.label}
                        />
                    ))}
                </div>
            </div>

            <div>
                <Label className={labelClass}>Cursos/Orientações sobre Amamentação</Label>
                <div className="space-y-2">
                    {cursoOptions.map((option) => (
                        <Checkbox
                            key={option.value}
                            value={option.value}
                            checked={((formData.curso_amament as string[]) || []).includes(option.value)}
                            onChange={() => toggleCurso(option.value)}
                            label={option.label}
                        />
                    ))}
                </div>
            </div>

            <div>
                <Label htmlFor="propaganda_formula" className={labelClass}>Recebeu Propaganda de Fórmula?</Label>
                <Select
                    id="propaganda_formula"
                    value={formData.propaganda_formula || ''}
                    onChange={(e) => updateField('propaganda_formula', e.target.value)}
                    className={inputClass}
                    options={[
                        { value: '1', label: 'Sim' },
                        { value: '2', label: 'Não' },
                    ]}
                    placeholder="Selecione"
                />
            </div>

            <div>
                <Label htmlFor="concep" className={labelClass}>Concepção</Label>
                <Select
                    id="concep"
                    value={formData.concep || ''}
                    onChange={(e) => updateField('concep', e.target.value)}
                    className={inputClass}
                    options={[
                        { value: '1', label: 'Natural' },
                        { value: '2', label: 'Reprodução Assistida' },
                    ]}
                    placeholder="Selecione"
                />
            </div>
        </div>
    );
}

function Step5({ formData, updateField, inputClass, labelClass }: any) {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Dados do Parto e do Bebê</h2>

            <div>
                <Label htmlFor="dt_parto" className={labelClass}>Data do Parto</Label>
                <Input
                    id="dt_parto"
                    type="date"
                    value={formData.dt_parto || ''}
                    onChange={(e) => updateField('dt_parto', e.target.value)}
                    className={inputClass}
                />
            </div>

            <div>
                <Label htmlFor="loc_parto" className={labelClass}>Local do Parto</Label>
                <Select
                    id="loc_parto"
                    value={formData.loc_parto || ''}
                    onChange={(e) => updateField('loc_parto', e.target.value)}
                    className={inputClass}
                    options={[
                        { value: '1', label: 'Hospital' },
                        { value: '2', label: 'Casa' },
                        { value: '3', label: 'Outro' },
                    ]}
                    placeholder="Selecione"
                />
            </div>

            <div>
                <Label htmlFor="ihac" className={labelClass}>Hospital Amigo da Criança?</Label>
                <Select
                    id="ihac"
                    value={formData.ihac || ''}
                    onChange={(e) => updateField('ihac', e.target.value)}
                    className={inputClass}
                    options={[
                        { value: '1', label: 'Sim' },
                        { value: '2', label: 'Não' },
                    ]}
                    placeholder="Selecione"
                />
            </div>

            <div>
                <Label htmlFor="tp_parto" className={labelClass}>Tipo de Parto</Label>
                <Select
                    id="tp_parto"
                    value={formData.tp_parto || ''}
                    onChange={(e) => updateField('tp_parto', e.target.value)}
                    className={inputClass}
                    options={[
                        { value: '1', label: 'Normal' },
                        { value: '2', label: 'Fórceps' },
                        { value: '3', label: 'Cesárea Eletiva' },
                        { value: '4', label: 'Cesárea de Urgência' },
                    ]}
                    placeholder="Selecione"
                />
            </div>

            <div>
                <Label htmlFor="sexo" className={labelClass}>Sexo do Bebê</Label>
                <Select
                    id="sexo"
                    value={formData.sexo || ''}
                    onChange={(e) => updateField('sexo', e.target.value)}
                    className={inputClass}
                    options={[
                        { value: '1', label: 'Masculino' },
                        { value: '2', label: 'Feminino' },
                    ]}
                    placeholder="Selecione"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="id_gest_sem" className={labelClass}>Idade Gestacional (semanas)</Label>
                    <Input
                        id="id_gest_sem"
                        type="number"
                        value={formData.id_gest_sem || ''}
                        onChange={(e) => updateField('id_gest_sem', parseInt(e.target.value))}
                        className={inputClass}
                    />
                </div>

                <div>
                    <Label htmlFor="id_gest_dias" className={labelClass}>Idade Gestacional (dias)</Label>
                    <Input
                        id="id_gest_dias"
                        type="number"
                        value={formData.id_gest_dias || ''}
                        onChange={(e) => updateField('id_gest_dias', parseInt(e.target.value))}
                        className={inputClass}
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="peso_nasc" className={labelClass}>Peso ao Nascer (gramas)</Label>
                <Input
                    id="peso_nasc"
                    type="number"
                    value={formData.peso_nasc || ''}
                    onChange={(e) => updateField('peso_nasc', parseInt(e.target.value))}
                    className={inputClass}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="apgar1" className={labelClass}>APGAR 1º minuto</Label>
                    <Input
                        id="apgar1"
                        type="number"
                        value={formData.apgar1 || ''}
                        onChange={(e) => updateField('apgar1', parseInt(e.target.value))}
                        className={inputClass}
                        placeholder="0-10"
                    />
                </div>

                <div>
                    <Label htmlFor="apgar5" className={labelClass}>APGAR 5º minuto</Label>
                    <Input
                        id="apgar5"
                        type="number"
                        value={formData.apgar5 || ''}
                        onChange={(e) => updateField('apgar5', parseInt(e.target.value))}
                        className={inputClass}
                        placeholder="0-10"
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="aloj_conj" className={labelClass}>Alojamento Conjunto?</Label>
                <Select
                    id="aloj_conj"
                    value={formData.aloj_conj || ''}
                    onChange={(e) => updateField('aloj_conj', e.target.value)}
                    className={inputClass}
                    options={[
                        { value: '1', label: 'Sim' },
                        { value: '2', label: 'Não' },
                    ]}
                    placeholder="Selecione"
                />
            </div>

            <div>
                <Label htmlFor="canguru" className={labelClass}>Posição Canguru?</Label>
                <Select
                    id="canguru"
                    value={formData.canguru || ''}
                    onChange={(e) => updateField('canguru', e.target.value)}
                    className={inputClass}
                    options={[
                        { value: '1', label: 'Sim' },
                        { value: '2', label: 'Não' },
                    ]}
                    placeholder="Selecione"
                />
            </div>
        </div>
    );
}

function Step6({ formData, updateField, inputClass, labelClass }: any) {
    const dispositOptions = [
        { value: '1', label: 'Copo' },
        { value: '2', label: 'Colher' },
        { value: '3', label: 'Mamadeira' },
        { value: '4', label: 'Sonda' },
        { value: '5', label: 'Nenhum' },
    ];

    const dificuldadeOptions = [
        { value: '1', label: 'Pega incorreta' },
        { value: '2', label: 'Dor ao amamentar' },
        { value: '3', label: 'Fissuras' },
        { value: '4', label: 'Ingurgitamento' },
        { value: '5', label: 'Pouco leite' },
        { value: '6', label: 'Bebê sonolento' },
        { value: '7', label: 'Bebê agitado' },
        { value: '0', label: 'Nenhuma' },
    ];

    const toggleDisposit = (value: string) => {
        const current = (formData.disposit_cadastro as string[]) || [];
        const updated = current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value];
        updateField('disposit_cadastro', updated);
    };

    const toggleDificuldade = (value: string) => {
        const current = (formData.dificuldade_cadastro as string[]) || [];
        const updated = current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value];
        updateField('dificuldade_cadastro', updated);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Amamentação e Avaliações</h2>

            <div>
                <Label htmlFor="prim_hora" className={labelClass}>Amamentou na 1ª Hora?</Label>
                <Select
                    id="prim_hora"
                    value={formData.prim_hora || ''}
                    onChange={(e) => updateField('prim_hora', e.target.value)}
                    className={inputClass}
                    options={[
                        { value: '1', label: 'Sim' },
                        { value: '2', label: 'Não' },
                    ]}
                    placeholder="Selecione"
                />
            </div>

            <div>
                <Label htmlFor="amament_24h_cadastro" className={labelClass}>Mamou nas Últimas 24h?</Label>
                <Select
                    id="amament_24h_cadastro"
                    value={formData.amament_24h_cadastro || ''}
                    onChange={(e) => updateField('amament_24h_cadastro', e.target.value)}
                    className={inputClass}
                    options={[
                        { value: '1', label: 'Sim' },
                        { value: '2', label: 'Não' },
                    ]}
                    placeholder="Selecione"
                />
            </div>

            <div>
                <Label htmlFor="outr_liq_24h_cadastro" className={labelClass}>Outros Líquidos nas Últimas 24h?</Label>
                <Select
                    id="outr_liq_24h_cadastro"
                    value={formData.outr_liq_24h_cadastro || ''}
                    onChange={(e) => updateField('outr_liq_24h_cadastro', e.target.value)}
                    className={inputClass}
                    options={[
                        { value: '1', label: 'Sim' },
                        { value: '2', label: 'Não' },
                    ]}
                    placeholder="Selecione"
                />
            </div>

            <div>
                <Label className={labelClass}>Dispositivos Utilizados</Label>
                <div className="space-y-2">
                    {dispositOptions.map((option) => (
                        <Checkbox
                            key={option.value}
                            value={option.value}
                            checked={((formData.disposit_cadastro as string[]) || []).includes(option.value)}
                            onChange={() => toggleDisposit(option.value)}
                            label={option.label}
                        />
                    ))}
                </div>
            </div>

            <div>
                <Label className={labelClass}>Dificuldades na Amamentação</Label>
                <div className="space-y-2">
                    {dificuldadeOptions.map((option) => (
                        <Checkbox
                            key={option.value}
                            value={option.value}
                            checked={((formData.dificuldade_cadastro as string[]) || []).includes(option.value)}
                            onChange={() => toggleDificuldade(option.value)}
                            label={option.label}
                        />
                    ))}
                </div>
            </div>

            <div>
                <Label htmlFor="chupeta_cadastro" className={labelClass}>Usa Chupeta?</Label>
                <Select
                    id="chupeta_cadastro"
                    value={formData.chupeta_cadastro || ''}
                    onChange={(e) => updateField('chupeta_cadastro', e.target.value)}
                    className={inputClass}
                    options={[
                        { value: '1', label: 'Sim' },
                        { value: '2', label: 'Não' },
                    ]}
                    placeholder="Selecione"
                />
            </div>

            <div>
                <Label htmlFor="auto_efic_inicial" className={labelClass}>Autoeficácia (BSES: 14-70)</Label>
                <Input
                    id="auto_efic_inicial"
                    type="number"
                    value={formData.auto_efic_inicial || ''}
                    onChange={(e) => updateField('auto_efic_inicial', parseInt(e.target.value))}
                    className={inputClass}
                    placeholder="14-70"
                />
            </div>

            <div>
                <Label htmlFor="anquiloglossia" className={labelClass}>Anquiloglossia (Frênulo Lingual)?</Label>
                <Select
                    id="anquiloglossia"
                    value={formData.anquiloglossia || ''}
                    onChange={(e) => updateField('anquiloglossia', e.target.value)}
                    className={inputClass}
                    options={[
                        { value: '1', label: 'Sim' },
                        { value: '2', label: 'Não' },
                    ]}
                    placeholder="Selecione"
                />
            </div>

            <div>
                <Label htmlFor="icter_neo" className={labelClass}>Icterícia Neonatal?</Label>
                <Select
                    id="icter_neo"
                    value={formData.icter_neo || ''}
                    onChange={(e) => updateField('icter_neo', e.target.value)}
                    className={inputClass}
                    options={[
                        { value: '1', label: 'Sim' },
                        { value: '2', label: 'Não' },
                    ]}
                    placeholder="Selecione"
                />
            </div>

            <div>
                <Label htmlFor="fototerapia" className={labelClass}>Fototerapia?</Label>
                <Select
                    id="fototerapia"
                    value={formData.fototerapia || ''}
                    onChange={(e) => updateField('fototerapia', e.target.value)}
                    className={inputClass}
                    options={[
                        { value: '1', label: 'Sim' },
                        { value: '2', label: 'Não' },
                    ]}
                    placeholder="Selecione"
                />
            </div>

            {formData.fototerapia === '1' && (
                <div>
                    <Label htmlFor="fototerapia_dias" className={labelClass}>Dias de Fototerapia</Label>
                    <Input
                        id="fototerapia_dias"
                        type="number"
                        value={formData.fototerapia_dias || ''}
                        onChange={(e) => updateField('fototerapia_dias', parseInt(e.target.value))}
                        className={inputClass}
                    />
                </div>
            )}

            <div>
                <Label htmlFor="ocup_mae" className={labelClass}>Situação de Emprego</Label>
                <Select
                    id="ocup_mae"
                    value={formData.ocup_mae || ''}
                    onChange={(e) => updateField('ocup_mae', e.target.value)}
                    className={inputClass}
                    options={[
                        { value: '1', label: 'Empregada' },
                        { value: '2', label: 'Desempregada' },
                        { value: '3', label: 'Autônoma' },
                        { value: '4', label: 'Do lar' },
                    ]}
                    placeholder="Selecione"
                />
            </div>

            <div>
                <Label htmlFor="retorno_trab" className={labelClass}>Pretende Retornar ao Trabalho?</Label>
                <Select
                    id="retorno_trab"
                    value={formData.retorno_trab || ''}
                    onChange={(e) => updateField('retorno_trab', e.target.value)}
                    className={inputClass}
                    options={[
                        { value: '1', label: 'Sim' },
                        { value: '2', label: 'Não' },
                    ]}
                    placeholder="Selecione"
                />
            </div>

            {formData.retorno_trab === '1' && (
                <div>
                    <Label htmlFor="tempo_retorno" className={labelClass}>Tempo para Retorno (meses)</Label>
                    <Input
                        id="tempo_retorno"
                        type="number"
                        value={formData.tempo_retorno || ''}
                        onChange={(e) => updateField('tempo_retorno', parseInt(e.target.value))}
                        className={inputClass}
                    />
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="banco_leite_recebeu" className={labelClass}>Recebeu do Banco de Leite?</Label>
                    <Select
                        id="banco_leite_recebeu"
                        value={formData.banco_leite_recebeu || ''}
                        onChange={(e) => updateField('banco_leite_recebeu', e.target.value)}
                        className={inputClass}
                        options={[
                            { value: '1', label: 'Sim' },
                            { value: '2', label: 'Não' },
                        ]}
                        placeholder="Selecione"
                    />
                </div>

                <div>
                    <Label htmlFor="banco_leite_doou" className={labelClass}>Doou para Banco de Leite?</Label>
                    <Select
                        id="banco_leite_doou"
                        value={formData.banco_leite_doou || ''}
                        onChange={(e) => updateField('banco_leite_doou', e.target.value)}
                        className={inputClass}
                        options={[
                            { value: '1', label: 'Sim' },
                            { value: '2', label: 'Não' },
                        ]}
                        placeholder="Selecione"
                    />
                </div>
            </div>
        </div>
    );
}
