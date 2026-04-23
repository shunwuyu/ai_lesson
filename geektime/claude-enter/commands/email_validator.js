/**
 * Validate email format using regular expression
 * @param {string} email - The email address to validate
 * @returns {boolean} - Returns true if email format is valid, false otherwise
 */
function is_valid_email(email) {
  // Check if input is a string
  if (typeof email !== 'string') {
    return false;
  }

  // Regular expression for email validation
  // This pattern checks for:
  // - Local part: alphanumeric characters and certain special characters (no consecutive dots)
  // - @ symbol
  // - Domain: alphanumeric characters and dots (no consecutive dots)
  // - TLD: at least 2 alphabetic characters
  const emailRegex = /^[a-zA-Z0-9]+([._%+-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
}

// Export the function for use in other modules
module.exports = is_valid_email;

// Test cases
function run_tests() {
  console.log('Running email validation tests...\n');

  // Valid email addresses
  const validEmails = [
    'test@example.com',
    'user.name@domain.co.uk',
    'admin+tag@site.org',
    'firstname-lastname@company.info',
    'user123@test-domain.com'
  ];

  console.log('Testing valid emails:');
  validEmails.forEach(email => {
    const result = is_valid_email(email);
    console.log(`  ${email}: ${result ? '✓ PASS' : '✗ FAIL'}`);
  });

  console.log('\nTesting invalid emails:');
  // Invalid email addresses
  const invalidEmails = [
    'invalid',                    // No @ symbol
    '@example.com',               // No local part
    'user@',                      // No domain
    'user@domain',                // No TLD
    'user@.com',                  // Domain starts with dot
    'user..name@example.com',     // Double dot in local part
    'user@domain..com',           // Double dot in domain
    '',                           // Empty string
    'user name@example.com',      // Space in local part
    'user@domain.c',              // TLD too short
    123,                          // Not a string
    null,                         // Null value
    undefined                     // Undefined value
  ];

  invalidEmails.forEach(email => {
    const result = is_valid_email(email);
    console.log(`  ${String(email)}: ${result ? '✗ FAIL (should be invalid)' : '✓ PASS'}`);
  });
}

// Run tests if this file is executed directly
if (require.main === module) {
  run_tests();
}
