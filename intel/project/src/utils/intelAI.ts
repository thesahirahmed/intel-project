import * as tf from '@tensorflow/tfjs';
import { Transaction } from '../types';

// Initialize TensorFlow.js with WebGL backend for hardware acceleration
await tf.setBackend('webgl');

export async function analyzeTransactionWithAI(transaction: Transaction): Promise<number> {
  // Convert transaction data to tensor
  const features = tf.tensor2d([[
    transaction.amount,
    getHourOfDay(transaction.timestamp),
    getDayOfWeek(transaction.timestamp),
    getLocationRiskScore(transaction.location.country),
    getCategoryRiskScore(transaction.category)
  ]]);

  // Simple neural network for demonstration
  const model = tf.sequential({
    layers: [
      tf.layers.dense({ units: 10, activation: 'relu', inputShape: [5] }),
      tf.layers.dense({ units: 5, activation: 'relu' }),
      tf.layers.dense({ units: 1, activation: 'sigmoid' })
    ]
  });

  // Predict risk score
  const prediction = model.predict(features) as tf.Tensor;
  const score = await prediction.data();

  // Cleanup
  features.dispose();
  model.dispose();
  prediction.dispose();

  return Math.round(score[0] * 100);
}

function getHourOfDay(date: Date): number {
  return date.getHours();
}

function getDayOfWeek(date: Date): number {
  return date.getDay();
}

function getLocationRiskScore(country: string): number {
  const highRiskCountries = ['Russia', 'Nigeria', 'North Korea'];
  const mediumRiskCountries = ['China', 'Brazil', 'Mexico'];
  
  if (highRiskCountries.includes(country)) return 1.0;
  if (mediumRiskCountries.includes(country)) return 0.5;
  return 0.1;
}

function getCategoryRiskScore(category: string): number {
  const highRiskCategories = ['Electronics', 'Other'];
  const mediumRiskCategories = ['Travel', 'Transfer'];
  
  if (highRiskCategories.includes(category)) return 1.0;
  if (mediumRiskCategories.includes(category)) return 0.5;
  return 0.1;
}