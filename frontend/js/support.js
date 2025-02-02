
// DOM Elements
const chatWindow = document.getElementById('chat-window');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');

const botResponses = {
  // Greetings and General
  greeting: "Hello! I'm FinanceBot. How can I assist you today?",
  goodbye: "Goodbye! Feel free to reach out anytime.",
  help: "I can help you track expenses, set budgets, view reports, get financial advice, and more. Just type your question!",
  default: "I'm not sure about that. Can you provide more details or I am Not Trained For That ?",

  // Expense Tracking
  expenses: "To track your expenses, go to the 'Expense Tracker' section on your dashboard.",
  addExpense: "You can add expenses in the 'Add Expense' section by selecting a category and entering the amount.",
  viewExpense: "To view all your expenses, navigate to the 'View Expenses' section on the dashboard.",
  editExpense: "To edit an expense, go to 'View Expenses', select the expense, and click 'Edit'.",
  deleteExpense: "To delete an expense, go to 'View Expenses', select the expense, and click 'Delete'.",

  // Budget Management
  budget: "You can set a monthly budget in the 'Budget Planner' section. Once set, you'll be notified if you exceed it.",
  resetBudget: "To reset your budget, navigate to 'Budget Planner' and set a new budget.",
  addToBudget: "You can add more funds to your budget in the 'Budget Planner' section.",
  checkBudget: "Your current budget and remaining balance are displayed in the 'Budget Planner' section.",

  // Reports and Graphs
  report: "To view your financial reports, navigate to 'Reports' in the menu. You can also download them as PDFs.",
  pdf: "You can generate a PDF report of your expenses by clicking on the 'Generate PDF' button in the 'Reports' section.",
  graph: "You can view a graphical comparison of your income and expenses in the 'Graphical Insights' section Under Finance Tracker",

  // Security and Account
  twoFactor: "To enable 2-factor authentication, go to the 'Settings' section and activate it for additional security.",
  forgotPassword: "If you forgot your password, click on 'Forgot Password' on the login page to reset it.",
  accountDelete: "To delete your account, go to 'Settings', and select 'Delete Account'. Note that this action is irreversible.",
  updateProfile: "You can update your profile information in the 'Settings' section.",

  // Financial Advice
  savingsTips: "To save money effectively, create a budget, track your expenses, and prioritize essential spending.",
  emergencyFund: "Build an emergency fund with at least 3-6 months of living expenses to cover unexpected costs.",
  investments: "Diversify your investments into stocks, bonds, mutual funds, and real estate for long-term growth.",
  debt: "Pay off high-interest debt as soon as possible, and avoid unnecessary borrowing.",
  creditScore: "Improve your credit score by paying bills on time and keeping your credit utilization low.",
  retirement: "Start saving for retirement early. Contribute to a retirement fund like a 401(k) or an IRA if available.",
  overspending: "To avoid overspending, stick to your budget and avoid impulse purchases.",
  incomeStreams: "Explore multiple streams of income, like freelancing or passive investments, to increase earnings.",
  financialGoals: "Set short-term and long-term financial goals to stay focused and motivated.",

  // User FAQs
  "how to start": "You can start by setting your budget in the 'Budget Planner' section, then track your expenses daily.",
  "can i export data": "Yes, you can export your expense data by generating a PDF in the 'Reports' section.",
  "where is my data stored": "Your data is securely stored on our servers with encryption to ensure privacy.",
  "how to manage loans": "Track your loan repayments in the 'Loan Management' section. Prioritize high-interest loans first.",
  "how to reduce expenses": "Analyze your spending habits and cut down on unnecessary expenses. Use our graph insights for a detailed view.",
  "how to track income": "You can track your income in the 'Income Tracker' section and compare it with expenses.",
  "can i set reminders": "Yes, you can set expense or budget reminders in the 'Settings' section.",
  "is my data secure": "Your data is encrypted and protected. You can enable 2-factor authentication for added security.",
  "how to view advice": "Go to the 'Financial Advice' section for tips on saving, investing, and managing money.",
  "what is remaining budget": "The remaining budget is calculated by subtracting your total expenses from your set budget.you can see it in the Tracker Section",

  // Goodbye and Final Help
  "can you help": "Of course! Let me know what you need help with, such as expenses, budgets, or reports.",
  goodbye: "Goodbye! Don't forget to save your changes before logging out.",

  // Additional User Queries
  "how to set a budget": "To set a budget, go to the 'Budget Planner' section and enter your monthly income and expenses.",
  "where can i view reports": "You can view your financial reports in the 'Reports' section from the menu.",
  "how to generate a pdf report": "To generate a PDF, click on 'Generate PDF' in the 'Reports' section after reviewing your data.",
  "can i track savings": "Yes, you can track your savings in the 'Savings Tracker' section.",
  "how do i compare income and expenses": "You can view the comparison of your income and expenses in the 'Graphical Insights' section.",
  "can i delete an expense": "Yes, you can delete an expense by going to the 'View Expenses' section and selecting 'Delete'.",
  "how do i set a monthly limit": "You can set a monthly limit by defining your budget in the 'Budget Planner' section.",
  "how to track income versus expenses": "You can track your income and expenses by using the 'Income Tracker' and 'Expense Tracker' sections.",
  "how to save for retirement": "Start saving for retirement by contributing to retirement accounts like a 401(k) or IRA as early as possible.",
  "what are tips for managing debt": "To manage debt, focus on paying off high-interest loans first and avoid taking on additional debt.",
  "how can i build an emergency fund": "Build an emergency fund by saving at least 3-6 months of living expenses for unexpected situations.",
  "what is a credit score": "A credit score is a numerical representation of your creditworthiness. A higher score helps with getting loans at better rates.",
  "how to improve credit score": "To improve your credit score, pay bills on time, reduce credit card balances, and avoid applying for multiple loans.",
  "how to start investing": "Start by diversifying your investments across stocks, bonds, and other assets based on your risk tolerance.",
  "how to reduce spending": "Review your spending habits, prioritize needs over wants, and eliminate unnecessary purchases to save money.",
  "how to invest in real estate": "Invest in real estate by researching local markets, considering rental properties, and consulting with real estate experts.",
  "how much should i save monthly": "Aim to save 20% of your monthly income for long-term goals, but adjust based on personal needs and financial goals.",
  "what are stocks and bonds": "Stocks represent ownership in a company, while bonds are loans to companies or governments that pay interest over time.",
  "how to diversify investments": "Diversify your portfolio by investing in various asset classes like stocks, bonds, real estate, and mutual funds.",
  "how to manage taxes": "Track tax-deductible expenses, contribute to retirement accounts, and consult a tax professional to reduce your tax burden.",
  "how to set financial goals": "Set clear, achievable goals for both short-term and long-term milestones, and create a plan to reach them.",
  "how to prepare for tax season": "Keep records of your income, deductions, and any tax credits throughout the year for an easier tax filing process.",
  "how to use a savings account": "A savings account helps you set aside money for emergencies or specific goals while earning interest on your balance.",
  "what is the best investment strategy": "A good investment strategy diversifies your assets, aligns with your risk tolerance, and includes both short-term and long-term goals.",
  "how to manage financial stress": "Reduce financial stress by creating a budget, prioritizing debts, and building an emergency fund.",
  "what are the best budgeting apps": "Some popular budgeting apps include Mint, YNAB (You Need A Budget), and Personal Capital.",
  "how to deal with financial emergencies": "Have an emergency fund to cover unexpected expenses and avoid high-interest loans like payday loans during a crisis.",
  "how to save for a big purchase": "Set aside a specific amount each month in a savings account, and track your progress toward your goal.",
  "how to refinance loans": "Refinance loans by finding a lender offering better terms, such as lower interest rates, and pay off your current loan early.",
  "how to manage multiple credit cards": "Keep track of balances, make timely payments, and avoid maxing out credit cards to improve your credit score.",
  "how to build a passive income stream": "Start investing in rental properties, dividend-paying stocks, or other income-generating investments to build passive income.",
  "how to save on utilities": "Reduce utility bills by using energy-efficient appliances, turning off unused devices, and using programmable thermostats.",
  "how to start a side hustle": "Consider freelancing, consulting, or starting an online business to generate extra income outside your regular job.",
  "how to set up an investment account": "You can set up an investment account through brokers, retirement accounts like IRAs, or platforms like Robo-advisors.",
  "how to create a financial plan": "A financial plan includes budgeting, saving, investing, debt management, and setting clear financial goals.",
  "what are the benefits of a 401(k)": "A 401(k) offers tax benefits, employer contributions, and helps you save for retirement long-term.",
  "how to calculate net worth": "Net worth is calculated by subtracting your liabilities (debts) from your assets (savings, investments, properties).",
  "how to make a budget work": "Stick to your budget by tracking all expenses, avoiding overspending, and adjusting it as needed over time.",
  "how to increase savings": "To increase savings, automate deposits into a savings account, cut unnecessary expenses, and track your spending patterns.",
  "how to manage personal finance": "Personal finance management involves budgeting, saving, investing, and tracking your expenses efficiently. Use the FinanceBot for assistance.",
  "best ways to reduce debt": "To reduce debt, focus on high-interest loans first, make extra payments if possible, and avoid taking on new debts unnecessarily.",
  "how to build wealth": "Building wealth requires consistent saving, smart investments, diversifying income streams, and avoiding excessive debt.",
  "how to improve financial literacy": "Enhance financial literacy by reading books, following finance blogs, and using tools like FinanceBot to track and manage finances.",
  "how to plan for big expenses": "Plan for big expenses by setting savings goals, cutting unnecessary spending, and considering investment options for higher returns.",
  "best way to handle unexpected expenses": "Always have an emergency fund with 3-6 months’ worth of expenses to cover unforeseen costs without falling into debt.",
  "how to cut monthly expenses": "Analyze your subscriptions, utilities, and daily expenses. Reduce spending on non-essential items and create a budget to stick to.",
  "how to increase credit score": "Make timely bill payments, reduce credit card usage, and avoid applying for too many new credit lines at once.",
  "best financial habits to develop": "Track expenses, save consistently, invest wisely, and live within your means to maintain good financial health.",
  "how to save money while shopping": "Use discount coupons, compare prices, buy in bulk, and avoid impulse buying to save more while shopping.",
  "how to create a financial safety net": "A financial safety net includes an emergency fund, insurance policies, and diversified investments to secure your future.",
  "what are tax-saving options": "Common tax-saving options include investing in tax-deferred retirement accounts, tax-exempt savings plans, and claiming deductions on eligible expenses.",
  "how to increase passive income": "Invest in dividend-paying stocks, real estate rentals, or create digital assets like e-books or online courses to generate passive income.",
  "best ways to avoid financial scams": "Avoid financial scams by verifying sources, being cautious with online transactions, and never sharing personal financial details with unverified parties.",
  "how to prepare for financial emergencies": "Always have an emergency fund, insurance coverage, and a backup income plan in case of financial hardships.",
  "should i get a financial advisor": "If you struggle with managing finances, investments, or tax planning, a financial advisor can provide expert guidance.",
  "how to retire early": "Save aggressively, invest wisely, reduce unnecessary spending, and explore passive income sources to retire early.",
  "how to maximize salary savings": "Allocate a percentage of your salary to savings, invest wisely, and minimize unnecessary expenses to make the most of your earnings."
};

// Function to generate bot response
function getBotResponse(userMessage) {
  const message = userMessage.toLowerCase();

  // Map user inputs to responses
  if (message.includes("hello") || message.includes("hi")) {
    return botResponses.greeting;
  } else if (message.includes("expense") || message.includes("spend")) {
    return botResponses.expenses;
  } else if (message.includes("add expense")) {
    return botResponses.addExpense;
  } else if (message.includes("view expense")) {
    return botResponses.viewExpense;
  } else if (message.includes("edit expense")) {
    return botResponses.editExpense;
  } else if (message.includes("delete expense")) {
    return botResponses.deleteExpense;
  } else if (message.includes("budget")) {
    return botResponses.budget;
  } else if (message.includes("reset budget")) {
    return botResponses.resetBudget;
  } else if (message.includes("add to budget")) {
    return botResponses.addToBudget;
  } else if (message.includes("check budget")) {
    return botResponses.checkBudget;
  } else if (message.includes("report") || message.includes("pdf")) {
    return botResponses.report;
  } else if (message.includes("graph")) {
    return botResponses.graph;
  } else if (message.includes("2-factor") || message.includes("authentication")) {
    return botResponses.twoFactor;
  } else if (message.includes("forgot password")) {
    return botResponses.forgotPassword;
  } else if (message.includes("delete account")) {
    return botResponses.accountDelete;
  } else if (message.includes("update profile")) {
    return botResponses.updateProfile;
  } else if (message.includes("advice") || message.includes("tips")) {
    return botResponses.savingsTips;
  } else if (message.includes("emergency fund")) {
    return botResponses.emergencyFund;
  } else if (message.includes("investment")) {
    return botResponses.investments;
  } else if (message.includes("debt")) {
    return botResponses.debt;
  } else if (message.includes("credit score")) {
    return botResponses.creditScore;
  } else if (message.includes("retirement")) {
    return botResponses.retirement;
  } else if (message.includes("overspending")) {
    return botResponses.overspending;
  } else if (message.includes("income streams")) {
    return botResponses.incomeStreams;
  } else if (message.includes("financial goals")) {
    return botResponses.financialGoals;
  } else if (message.includes("can i export data")) {
    return botResponses["can i export data"];
  } else if (message.includes("how to start")) {
    return botResponses["how to start"];
  } else if (message.includes("is my data secure")) {
    return botResponses["is my data secure"];
  } else if (message.includes("reminders")) {
    return botResponses["can i set reminders"];
  } else if (message.includes("remaining budget")) {
    return botResponses["what is remaining budget"];
  } else if (message.includes("help")) {
    return botResponses.help;
  } else if (message.includes("bye")) {
    return botResponses.goodbye;
  } else {
    return botResponses.default;
  }
}


// Function to add chat bubble
function addChatBubble(message, isBot = false) {
  const bubble = document.createElement('div');
  bubble.classList.add('chat-bubble', isBot ? 'bot-bubble' : 'user-bubble');
  bubble.textContent = message;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to bottom
}

// Event Listener for Send Button
sendButton.addEventListener('click', () => {
  const userMessage = chatInput.value.trim();
  if (userMessage === '') return;

  // Add user message
  addChatBubble(userMessage);

  // Clear input field
  chatInput.value = '';

  // Simulate bot response after a short delay
  setTimeout(() => {
    const botMessage = getBotResponse(userMessage);
    addChatBubble(botMessage, true);
  }, 500);
});

// Allow sending messages with Enter key
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sendButton.click();
  }
});
