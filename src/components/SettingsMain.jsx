
import {useSettings} from "./context/SettingsContext";
import "../styles/settings.css";

function SettingsMain({onClose}) {
    const {alphabetType, setAlphabetType, customAlphabet, setCustomAlphabet } = useSettings();

    return (
            <div className="settings-content">
                <h2>⚙️ Configuración</h2>

                <label>Tipo de alfabeto:</label>
                <select value={alphabetType} onChange={(e) => setAlphabetType(e.target.value)}>
                    <option value="mayusculas">Mayúsculas (A-Z)</option>
                    <option value="minusculas">Minúsculas (a-z)</option>
                    <option value="mayusminus">Mayúsculas y Minúsculas (A-Z, a-z)</option>
                    <option value="simbolos">Símbolos (especiales)</option>
                    <option value="alfanumerico">Alfanumérico (A-Z, 0-9)</option>
                    <option value="completo">Completo (A-Z, a-z, 0-9)</option>
                    <option value="numeros">Números (0-9)</option>
                    <option value="personalizado">Personalizado</option>
                </select>

                {alphabetType === 'personalizado' && (
                    <input
                        type="text"
                        placeholder="Ingrese su alfabeto personalizado"
                        value={custonAlphabet}
                        onChange={(e) => setCustomAlphabet(e.target.value)}
                    />
                )}

                <div className="settings-actions">
                    <button onClick={onClose}>Cerrar</button>
                </div>
            </div>
    );
}

export default SettingsMain;