
import {useSettings} from "../context/SettingsContext";
import "../styles/settings.css";

function SettingsMain({onClose, show}) {
    const {
        alphabetType, 
        setAlphabetType, 
        customAlphabet, 
        setCustomAlphabet,
        enableNormalization,
        setEnableNormalization,
        preserveCase,
        setPreserveCase
    } = useSettings();

    return (
        <div
            className={`settings-modal ${show ? "show" : ""}`}
            onClick={onClose}
        >       
            <div className="settings-content"
                onClick={(e) => e.stopPropagation()}
            >
                <h2>⚙️ Configuración</h2>

                <label>Tipo de alfabeto:</label>
                <select 
                    value={alphabetType} 
                    onChange={(e) => setAlphabetType(e.target.value)}
                >
                    <option value="mayusculas">Mayúsculas (A-Z)</option>
                    <option value="minusculas">Minúsculas (a-z)</option>
                    <option value="mayusminus">Mayúsculas y Minúsculas (A-Z, a-z)</option>
                    <option value="simbolos">Símbolos (especiales)</option>
                    <option value="alfanumerico">Alfanumérico (A-Z, a-z, 0-9)</option>
                    <option value="numeros">Números (0-9)</option>
                    <option value="personalizado">Personalizado</option>
                </select>

                <div className="checkbox-group">
                    <span>Habilitar normalización</span>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={enableNormalization}
                            onChange={(e) => setEnableNormalization(e.target.checked)}
                        />
                        <span className="slider"></span>
                    </label>
                </div>

                <div className="checkbox-group">
                    <span>Preservar caracteres no alfabéticos</span>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={preserveCase}
                            onChange={(e) => setPreserveCase(e.target.checked)}
                        />
                        <span className="slider"></span>
                    </label>
                </div>


                {alphabetType === 'personalizado' && (
                    <input
                        type="text"
                        placeholder="Ingrese su alfabeto personalizado"
                        value={customAlphabet}
                        onChange={(e) => setCustomAlphabet(e.target.value)}
                    />
                )}

                <div className="settings-actions">
                    <button onClick={onClose}>Cerrar</button>
                </div>
            </div>
        </div>
    );
}

export default SettingsMain;