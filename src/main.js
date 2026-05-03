import { steps } from './steps.js';
import {
  renderStep,
  renderProgress,
  renderError,
  showLoading,
  renderAIResponse,
} from './ui.js';
import { askGemini, sanitizeInput } from './gemini.js';

/**
 * Safe GA4 event wrapper — silently no-ops if gtag is unavailable
 * (e.g. dev environment with no measurement ID configured).
 * @param {string} eventName
 * @param {Object} [params]
 */
function trackEvent(eventName, params = {}) {
  if (typeof gtag === 'function') {
    gtag('event', eventName, params);
  }
}

/**
 * Application state — single source of truth.
 */
const state = {
  currentStepIndex: 0,
};

/**
 * Render the current step and update all dependent UI.
 */
function updateView() {
  const step = steps[state.currentStepIndex];
  renderStep(step, steps.length);
  renderProgress(step.id, steps.length);
  updateNavButtons();
  clearAIResponse();
}

/**
 * Enable / disable navigation buttons based on current step.
 */
function updateNavButtons() {
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  if (prevBtn) {
    prevBtn.disabled = state.currentStepIndex === 0;
  }
  if (nextBtn) {
    nextBtn.disabled = state.currentStepIndex === steps.length - 1;
  }
}

/**
 * Clear the AI response area between step navigations.
 */
function clearAIResponse() {
  const container = document.getElementById('ai-response');
  if (container) container.innerHTML = '';
  const input = document.getElementById('user-question');
  if (input) input.value = '';
}

/**
 * Handle "Ask AI" form submission.
 * @param {SubmitEvent} e
 */
async function handleAskSubmit(e) {
  e.preventDefault();

  const input = document.getElementById('user-question');
  if (!input) return;

  const raw = input.value;
  const sanitized = sanitizeInput(raw);

  if (!sanitized) {
    renderError('Please type a question before submitting.');
    return;
  }

  const currentStep = steps[state.currentStepIndex];

  // Track question submission
  trackEvent('ai_question_asked', {
    step_number: state.currentStepIndex + 1,
    step_title: currentStep.title,
  });

  try {
    showLoading(true);
    const answer = await askGemini(currentStep.title, sanitized);
    renderAIResponse(answer);
    // Track successful response
    trackEvent('ai_response_received', {
      step_number: state.currentStepIndex + 1,
      step_title: currentStep.title,
    });
  } catch {
    renderError('Something went wrong. Please try again.');
  } finally {
    showLoading(false);
  }
}

/**
 * Initialize the application once the DOM is ready.
 */
function init() {
  // Set footer year
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Render the first step
  updateView();

  // Track initial page view
  trackEvent('page_view', {
    page_title: document.title,
    page_location: window.location.href,
  });

  // Wire up navigation
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (state.currentStepIndex > 0) {
        state.currentStepIndex--;
        updateView();
        trackEvent('step_navigation', {
          direction: 'prev',
          step_number: state.currentStepIndex + 1,
        });
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (state.currentStepIndex < steps.length - 1) {
        state.currentStepIndex++;
        updateView();
        trackEvent('step_navigation', {
          direction: 'next',
          step_number: state.currentStepIndex + 1,
        });
      }
    });
  }

  // Wire up AI form
  const form = document.getElementById('ask-form');
  if (form) {
    form.addEventListener('submit', handleAskSubmit);
  }
}

document.addEventListener('DOMContentLoaded', init);
