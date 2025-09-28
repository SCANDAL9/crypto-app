import { useSettings } from "./SettingsContext";
import { SettingsIcon, ToggleOpenIcon, CheckIcon } from "../assets/icons";
import "../styles/settings.css";

function SettingsMain({ onClose, show = true }) {
  const {
    alphabetType,
    setAlphabetType,
    customAlphabet,
    setCustomAlphabet,
    enableNormalization,
    setEnableNormalization,
    preserveCase,
    setPreserveCase,
  } = useSettings();

  return (
    <div className={`settings-modal ${show ? "show" : ""}`} onClick={onClose}>
      <div className="settings-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="settings-header">
          <div className="settings-title-container">
              <SettingsIcon width={20} height={20}/>
            <h2>Configuración</h2>
          </div>
          
          <button className="close-btn" onClick={onClose}>
            <ToggleOpenIcon width={16} height={16} />
          </button>

        </div>

        {/* Content */}
        <div className="settings-body">
          
          {/* Alphabet Section */}
          <div className="settings-section">
            <div className="section-header">
              <h3>Alfabeto y Caracteres</h3>
            </div>
            
            <div className="form-group">
              <label htmlFor="alphabet-select">Tipo de alfabeto:</label>
              <div className="select-container">
                <select
                  id="alphabet-select"
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
              </div>
            </div>

            {alphabetType === "personalizado" && (
              <div className="form-group custom-alphabet-group">
                <label htmlFor="custom-alphabet">Alfabeto personalizado:</label>
                <input
                  id="custom-alphabet"
                  type="text"
                  placeholder="Ingrese su alfabeto personalizado (ej: ABCDEFG123)"
                  value={customAlphabet}
                  onChange={(e) => setCustomAlphabet(e.target.value)}
                />
                <small className="input-hint">
                  Cada carácter será usado para el cifrado. 
                </small>
              </div>
            )}
          </div>

          {/* Processing Options */}
          <div className="settings-section">
            <div className="section-header">
              <h3>Opciones de Procesamiento</h3>
            </div>

            <div className="toggle-group">
              <div className="toggle-item">
                <div className="toggle-info">
                  <span className="toggle-label">Habilitar normalización</span>
                  <small className="toggle-description">
                    Convierte caracteres al tipo de Alfabeto
                  </small>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={enableNormalization}
                    onChange={(e) => setEnableNormalization(e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="toggle-item">
                <div className="toggle-info">
                  <span className="toggle-label">Preservar caracteres no alfabéticos</span>
                  <small className="toggle-description">
                    Mantiene espacios, números y símbolos en su posición original
                  </small>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={preserveCase}
                    onChange={(e) => setPreserveCase(e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="settings-footer">
          <button className="btn-primary" onClick={onClose}>
            <CheckIcon width={20} height={20}/>
            Aplicar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsMain;