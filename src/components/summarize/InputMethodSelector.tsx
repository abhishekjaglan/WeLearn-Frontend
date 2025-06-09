import { motion } from 'framer-motion';

type InputMethod = 'url' | 'document' | 'text';

interface InputMethodSelectorProps {
    selectedMethod: InputMethod;
    onMethodChange: (method: InputMethod) => void;
}
const InputMethodSelector = ({ selectedMethod, onMethodChange }: InputMethodSelectorProps) => {
    const methods = [
        { id: 'url' as InputMethod, label: 'URL', icon: '🔗' },
        { id: 'document' as InputMethod, label: 'Document', icon: '📄' },
        { id: 'text' as InputMethod, label: 'Text', icon: '📝' }
    ];

    return (
        <div className="flex space-x-2 mb-6 bg-gray-100 p-1 rounded-lg">
            {methods.map((method) => (
                <button
                    key={method.id}
                    onClick={() => onMethodChange(method.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-colors ${selectedMethod === method.id
                            ? 'bg-white shadow-sm text-blue-600'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    <span>{method.icon}</span>
                    <span className="font-medium">{method.label}</span>
                </button>
            ))}
        </div>
    );
};

export default InputMethodSelector;