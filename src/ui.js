/**
 * UI rendering functions for Civic Compass.
 * All functions are pure DOM manipulators — no side effects at import time.
 */

/**
 * Render the current step card content.
 * @param {Object} step - Step data object.
 * @param {number} totalSteps - Total number of steps.
 */
export function renderStep(step, totalSteps) {
  const card = document.getElementById('step-card');
  if (!card) return;

  // Trigger re-animation by forcing reflow
  card.style.animation = 'none';
  // eslint-disable-next-line no-unused-expressions
  card.offsetHeight; // trigger reflow
  card.style.animation = '';

  card.innerHTML = `
    <p class="step-meta">Step ${step.id} of ${totalSteps}</p>
    <div class="step-header">
      <span class="step-icon" aria-hidden="true">${step.icon}</span>
      <h2 class="step-title">${step.title}</h2>
    </div>
    <p class="step-description">${step.description}</p>
    <div class="step-tips">
      <h3>💡 Pro Tips</h3>
      <ul>
        ${step.tips.map((tip) => `<li>${tip}</li>`).join('')}
      </ul>
    </div>
    <div class="step-mistakes">
      <h3>⚠️ Common Mistake</h3>
      <p>${step.commonMistakes}</p>
    </div>
  `;
}

/**
 * Update the progress bar and label.
 * @param {number} current - Current step number (1-indexed).
 * @param {number} total - Total number of steps.
 */
export function renderProgress(current, total) {
  const progress = document.getElementById('step-progress');
  const label = document.getElementById('progress-label');

  if (progress) {
    progress.value = current;
    progress.setAttribute('aria-valuenow', String(current));
  }

  if (label) {
    label.textContent = `Step ${current} of ${total}`;
  }
}

/**
 * Display an error message in the AI response area.
 * @param {string} message - Error message to display.
 */
export function renderError(message) {
  const container = document.getElementById('ai-response');
  if (!container) return;

  container.innerHTML = `
    <div class="error-message" role="alert">
      <strong>Error:</strong> ${message}
    </div>
  `;
}

/**
 * Toggle loading indicator in the AI response area.
 * @param {boolean} isLoading - Whether to show or hide loading state.
 */
export function showLoading(isLoading) {
  const container = document.getElementById('ai-response');
  const submitBtn = document.querySelector('#ask-form button[type="submit"]');

  if (submitBtn) {
    submitBtn.disabled = isLoading;
    submitBtn.setAttribute('aria-busy', String(isLoading));
  }

  if (!container) return;

  if (isLoading) {
    container.innerHTML = `
      <div class="loading-indicator" aria-label="Loading response">
        <div class="loading-dots">
          <span></span><span></span><span></span>
        </div>
        <span>Thinking…</span>
      </div>
    `;
  }
}

/**
 * Display the AI-generated response.
 * @param {string} text - Response text from Gemini.
 */
export function renderAIResponse(text) {
  const container = document.getElementById('ai-response');
  if (!container) return;

  container.innerHTML = `
    <div class="ai-response-content">
      ${text}
    </div>
  `;
}
