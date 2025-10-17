import React from 'react';
import { SectionId, SECTIONS, QuizQuestion } from '../types';
import InteractiveDemo from './InteractiveDemo';
import Quiz from './Quiz';
import FeedbackForm from './FeedbackForm';

interface ContentRendererProps {
  activeSection: SectionId;
}

const SectionWrapper: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="animate-fade-in bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
    <h2 className="text-4xl font-bold mb-6 text-primary dark:text-accent border-b-4 border-accent pb-3">{title}</h2>
    <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
      {children}
    </div>
  </div>
);

const ContentRenderer: React.FC<ContentRendererProps> = ({ activeSection }) => {
  const section = SECTIONS.find(s => s.id === activeSection);
  if (!section) return null;

  switch (activeSection) {
    case SectionId.Aim:
      return (
        <SectionWrapper title={section.title}>
          <p>
            The aim of this project is to implement and demonstrate the functionality of a Hash-based Message Authentication Code (HMAC). This interactive application will provide a comprehensive understanding of HMAC's purpose, its underlying cryptographic principles, and its practical application in ensuring data integrity and authenticity.
          </p>
        </SectionWrapper>
      );
    case SectionId.Theory:
      return (
        <SectionWrapper title={section.title}>
          <h3 className="text-2xl font-semibold mt-4 mb-2">What is HMAC?</h3>
          <p>
            HMAC stands for Hash-based Message Authentication Code. It is a specific type of message authentication code (MAC) involving a cryptographic hash function and a secret cryptographic key. As with any MAC, it may be used to simultaneously verify both the data integrity and authenticity of a message.
          </p>
          <h3 className="text-2xl font-semibold mt-6 mb-2">How does it work?</h3>
          <p>
            HMAC combines the message with a secret key and then passes the result through a hash function (like SHA-256). The secret key is used twice in the process. This prevents simple hash collision attacks and ensures that only someone with the secret key can generate a valid HMAC for a given message.
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li><strong>Data Integrity:</strong> It ensures that the message has not been altered in transit. If even one bit of the message changes, the resulting HMAC will be completely different.</li>
            <li><strong>Authenticity:</strong> Because it requires a secret key, a valid HMAC confirms that the message originated from a party that possesses the key.</li>
          </ul>
          <h3 className="text-2xl font-semibold mt-6 mb-2">HMAC vs. Simple Hashing</h3>
          <p>
            A simple hash (like SHA-256) of a message can prove integrity, but not authenticity. Anyone can compute the hash of a message. HMAC adds a layer of authentication by introducing a shared secret that is known only to the sender and receiver.
          </p>
        </SectionWrapper>
      );
    case SectionId.Procedure:
      return (
        <SectionWrapper title={section.title}>
          <p>The HMAC algorithm is defined by RFC 2104. The process for generating an HMAC, for example using SHA-256, is as follows:</p>
          <ol className="list-decimal pl-6 mt-4 space-y-4">
            <li>
              <strong>Key Preparation:</strong> If the secret key is longer than the hash function's block size (64 bytes for SHA-256), the key is first hashed to create a key of the correct length. If it's shorter, it's padded with zero bytes to the block size.
            </li>
            <li>
              <strong>Inner Padding (ipad):</strong> The prepared key is XORed with a constant inner padding string (`ipad`), which consists of repeated bytes of value `0x36`.
            </li>
            <li>
              <strong>Inner Hash:</strong> The result from the previous step is appended to the message, and the entire string is hashed.
            </li>
            <li>
              <strong>Outer Padding (opad):</strong> The prepared key is XORed with a constant outer padding string (`opad`), which consists of repeated bytes of value `0x5C`.
            </li>
            <li>
              <strong>Outer Hash:</strong> The result from the inner hash (step 3) is appended to the outer padded key (step 4), and this entire string is hashed again.
            </li>
            <li>
              <strong>Final HMAC:</strong> The result of the outer hash is the final HMAC value, typically represented as a hexadecimal string.
            </li>
          </ol>
          <pre className="bg-gray-200 dark:bg-gray-900 rounded-lg p-4 mt-6 text-sm">
            <code>
              HMAC(K, m) = H((K' ⊕ opad) || H((K' ⊕ ipad) || m))
            </code>
          </pre>
        </SectionWrapper>
      );
    case SectionId.Pretest:
      const pretestQuestions: QuizQuestion[] = [
        {
          question: "What are the two main security guarantees provided by HMAC?",
          options: ["Confidentiality and Integrity", "Integrity and Authenticity", "Authenticity and Non-repudiation", "Confidentiality and Availability"],
          correctAnswer: 1,
          explanation: "HMAC ensures that the message hasn't been tampered with (integrity) and that it comes from someone who knows the secret key (authenticity)."
        },
        {
          question: "What is the primary difference between a simple cryptographic hash and an HMAC?",
          options: ["HMAC is faster", "HMAC is reversible", "HMAC uses a secret key", "HMAC produces a longer output"],
          correctAnswer: 2,
          explanation: "The use of a secret key is the defining feature of HMAC, which adds authenticity to the integrity provided by a standard hash function."
        },
        {
          question: "What does 'H' stand for in HMAC?",
          options: ["Hashed", "Hybrid", "Hierarchical", "Hash"],
          correctAnswer: 3,
          explanation: "H stands for Hash, as in a cryptographic hash function like SHA-256, which is a core component of the HMAC algorithm."
        }
      ];
      return <Quiz title={section.title} questions={pretestQuestions} />;
    case SectionId.Demo:
      return (
        <SectionWrapper title={section.title}>
            <p className="mb-6">Enter a message and a secret key below to generate an HMAC-SHA256 signature. This demonstrates how a small change in either the message or the key produces a completely different output, ensuring data integrity and authenticity.</p>
            <InteractiveDemo />
        </SectionWrapper>
      );
    case SectionId.Practice:
       const practiceQuestions: QuizQuestion[] = [
        {
          question: "If an attacker intercepts a message and its HMAC, but doesn't know the key, can they create a valid HMAC for a *different* message?",
          options: ["Yes, easily", "Yes, if they are clever", "No, it's computationally infeasible", "Only if the hash function is weak"],
          correctAnswer: 2,
          explanation: "Without the secret key, it is computationally infeasible to generate a valid HMAC for a new message. This is the core security principle of HMAC."
        },
        {
          question: "In the HMAC formula H((K' ⊕ opad) || H((K' ⊕ ipad) || m)), how many times is the hash function 'H' applied?",
          options: ["Once", "Twice", "Three times", "Depends on the message length"],
          correctAnswer: 1,
          explanation: "The hash function is applied twice: once on the inner padded key and message, and a second time on the outer padded key and the result of the first hash."
        },
      ];
      return <Quiz title={section.title} questions={practiceQuestions} />;
    case SectionId.Posttest:
       const posttestQuestions: QuizQuestion[] = [
        {
          question: "What is the role of 'ipad' and 'opad' in the HMAC construction?",
          options: ["To encrypt the message", "To shorten the key", "To create two different secret keys from one", "To pad the message to a specific length"],
          correctAnswer: 2,
          explanation: "ipad (inner pad) and opad (outer pad) are used to process the secret key in two distinct ways, effectively creating two derived keys for the inner and outer hash operations, which protects against certain attacks."
        },
        {
          question: "Which of these is NOT a required component for generating an HMAC?",
          options: ["A message", "A secret key", "A cryptographic hash function", "A public key"],
          correctAnswer: 3,
          explanation: "HMAC is a symmetric key algorithm. It uses a shared secret key, not a public/private key pair."
        },
        {
          question: "If Alice and Bob share a secret key, and Bob receives a message with a valid HMAC, what can Bob conclude?",
          options: ["The message is confidential", "The message is from Alice and has not been altered", "Anyone could have sent the message", "The message contains no errors"],
          correctAnswer: 1,
          explanation: "A valid HMAC proves that the sender possessed the secret key (authenticity, proving it's from Alice) and that the message is unchanged (integrity)."
        },
        {
          question: "If the secret key used for HMAC is longer than the hash function's block size, what happens to it?",
          options: ["It is truncated", "It is padded with zeros", "An error is thrown", "It is hashed to fit the block size"],
          correctAnswer: 3,
          explanation: "The HMAC standard specifies that if the key is too long, it should first be hashed down to the size of the hash output, which is then used as the actual key."
        }
      ];
      return <Quiz title={section.title} questions={posttestQuestions} />;
    case SectionId.References:
      return (
        <SectionWrapper title={section.title}>
            <ul className="list-disc pl-6 space-y-3">
              <li><a href="https://tools.ietf.org/html/rfc2104" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">RFC 2104: HMAC: Keyed-Hashing for Message Authentication</a></li>
              <li><a href="https://en.wikipedia.org/wiki/HMAC" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Wikipedia: HMAC</a></li>
              <li><a href="https://csrc.nist.gov/publications/detail/fips/198/1/final" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">NIST FIPS PUB 198-1: The Keyed-Hash Message Authentication Code (HMAC)</a></li>
              <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">MDN Web Docs: SubtleCrypto API</a></li>
            </ul>
        </SectionWrapper>
      );
    case SectionId.Contributors:
      return (
        <SectionWrapper title={section.title}>
          <p>This project was created by:</p>
          <ul className="list-disc pl-6 mt-4">
            <li>Prerana A Shetty</li>
            <li>Pratap</li>
          </ul>
        </SectionWrapper>
      );
    case SectionId.Feedback:
      return (
        <SectionWrapper title={section.title}>
            <p className="mb-6">We value your feedback! Please let us know what you think about this application or if you have any suggestions for improvement.</p>
            <FeedbackForm />
        </SectionWrapper>
      );
    default:
      return <SectionWrapper title="Not Found">Content not found.</SectionWrapper>;
  }
};

export default ContentRenderer;
