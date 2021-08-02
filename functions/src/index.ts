import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

exports.updateCounter = functions.firestore
  .document('quiz/{quizId}/responses/{responseId}')
  .onCreate((snap, context) => {
    db.doc(`quiz/${context.params.quizId}`).update({
      responseCount: admin.firestore.FieldValue.increment(1),
    });
  });
