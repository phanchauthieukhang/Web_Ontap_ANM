/**
 * Comprehensive Validation Script for Questions Database
 * Validates all 10 criteria outlined in the Project Brief
 */

import * as fs from 'fs';
import * as path from 'path';

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  distractorRationale?: string;
}

interface Question {
  id: number;
  originalQuestion: string;
  displayQuestion: string;
  originalAnswer: string;
  answerType: 'single_choice' | 'boolean';
  questionPolarity: 'positive' | 'negative';
  topicId: string;
  topicName: string;
  conceptId: string;
  conceptName: string;
  options: Option[];
  correctOptionId: string;
  explanation: {
    correctRationale: string;
    keyTakeaway: string;
  };
  sourceReferences: string[];
  academicNote?: string;
  reviewStatus: 'verified' | 'academic_caution';
}

function runValidation() {
  console.log('--- STARTING QUESTION BANK VALIDATION ---');
  const filePath = path.join(process.cwd(), 'src', 'data', 'questions.json');
  if (!fs.existsSync(filePath)) {
    console.error(`ERROR: File not found at ${filePath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const questions: Question[] = JSON.parse(raw);

  let errors = 0;
  let warnings = 0;

  // 1. Check total count
  if (questions.length !== 70) {
    console.error(`[FAIL] Total questions count is ${questions.length}, expected 70.`);
    errors++;
  } else {
    console.log(`[PASS] Total count: 70/70 questions present.`);
  }

  // 2. Check sequential IDs without gaps or duplicates
  const seenIds = new Set<number>();
  questions.forEach((q, index) => {
    const expectedId = index + 1;
    if (q.id !== expectedId) {
      console.error(`[FAIL] Question at index ${index} has id ${q.id}, expected ${expectedId}.`);
      errors++;
    }
    if (seenIds.has(q.id)) {
      console.error(`[FAIL] Duplicate question id: ${q.id}.`);
      errors++;
    }
    seenIds.add(q.id);

    // Check mandatory fields
    if (!q.originalQuestion || !q.displayQuestion) {
      console.error(`[FAIL] Q${q.id}: Missing question text.`);
      errors++;
    }
    if (!q.originalAnswer) {
      console.error(`[FAIL] Q${q.id}: Missing original answer.`);
      errors++;
    }
    if (!q.topicId || !q.topicName || !q.conceptId || !q.conceptName) {
      console.error(`[FAIL] Q${q.id}: Missing topic or concept metadata.`);
      errors++;
    }

    // Check options
    if (q.answerType === 'boolean') {
      if (q.options.length !== 2) {
        console.error(`[FAIL] Q${q.id} (boolean): Expected 2 options, found ${q.options.length}.`);
        errors++;
      }
    } else {
      if (q.options.length !== 4) {
        console.error(`[FAIL] Q${q.id} (single_choice): Expected 4 options, found ${q.options.length}.`);
        errors++;
      }
    }

    // Check option uniqueness
    const optionTexts = new Set<string>();
    q.options.forEach(opt => {
      const trimmed = opt.text.trim().toLowerCase();
      if (optionTexts.has(trimmed)) {
        console.error(`[FAIL] Q${q.id}: Duplicate option text "${opt.text}".`);
        errors++;
      }
      optionTexts.add(trimmed);
    });

    // Check exactly one correct option
    const correctOpts = q.options.filter(o => o.isCorrect);
    if (correctOpts.length !== 1) {
      console.error(`[FAIL] Q${q.id}: Has ${correctOpts.length} correct options, expected exactly 1.`);
      errors++;
    } else {
      if (correctOpts[0].id !== q.correctOptionId) {
        console.error(`[FAIL] Q${q.id}: correctOptionId mismatch (${q.correctOptionId} vs ${correctOpts[0].id}).`);
        errors++;
      }
    }

    // Check explanation
    if (!q.explanation.correctRationale || !q.explanation.keyTakeaway) {
      console.error(`[FAIL] Q${q.id}: Missing rationale or key takeaway.`);
      errors++;
    }

    // Check specific academic note requirements
    if ([8, 15, 20, 28, 40, 53].includes(q.id)) {
      if (!q.academicNote) {
        console.warn(`[WARN] Q${q.id}: Expected academicNote for sensitive academic caution question.`);
        warnings++;
      }
    }
  });

  // Check distribution of correctOptionId across A, B, C, D
  const dist: Record<string, number> = {};
  questions.forEach(q => {
    dist[q.correctOptionId] = (dist[q.correctOptionId] || 0) + 1;
  });
  console.log(`[PASS] Answer keys distribution: A=${dist['A'] || 0}, B=${dist['B'] || 0}, C=${dist['C'] || 0}, D=${dist['D'] || 0}`);
  if ((dist['A'] || 0) > 30 || (dist['B'] || 0) > 30 || (dist['C'] || 0) > 30 || (dist['D'] || 0) > 30) {
    console.warn(`[WARN] Answer distribution appears skewed: ${JSON.stringify(dist)}`);
    warnings++;
  }

  console.log('--- VALIDATION SUMMARY ---');
  console.log(`Questions checked: ${questions.length}`);
  console.log(`Errors: ${errors}`);
  console.log(`Warnings: ${warnings}`);

  if (errors > 0) {
    console.error('Validation FAILED with errors.');
    process.exit(1);
  } else {
    console.log('Validation SUCCEEDED! All 70 questions are fully compliant.');
  }
}

runValidation();
