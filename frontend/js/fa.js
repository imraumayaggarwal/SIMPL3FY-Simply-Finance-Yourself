document.addEventListener("DOMContentLoaded", () => {
    // Array of FAQ questions and answers
const faqs = [
    {
      question: "What is personal finance?",
      answer: "Personal finance involves managing your income, expenses, savings, and investments to achieve financial goals."
    },
    {
      question: "Why is budgeting important?",
      answer: "Budgeting helps track spending, avoid unnecessary debt, and allocate funds toward savings and investments."
    },
    {
      question: "How much of my income should I save?",
      answer: "Aim to save at least 20% of your income using the 50/30/20 rule (50% needs, 30% wants, 20% savings)."
    },
    {
      question: "What are the different types of investments?",
      answer: "Stocks, bonds, mutual funds, ETFs, real estate, gold, and cryptocurrencies."
    },
    {
      question: "What is the stock market?",
      answer: "A marketplace where shares of public companies are bought and sold."
    },
    {
      question: "What is SIP (Systematic Investment Plan)?",
      answer: "A way to invest small amounts regularly in mutual funds to build wealth over time."
    },
    {
      question: "How do I calculate returns on investments?",
      answer: "Use the formula: ROI = (Current Value - Initial Investment) / Initial Investment × 100"
    },
    {
      question: "What is diversification, and why is it important?",
      answer: "Diversification involves spreading investments across assets to reduce risk."
    },
    {
      question: "What is an emergency fund, and how much should I have?",
      answer: "An emergency fund covers 3–6 months of expenses in case of unexpected events."
    },
    {
      question: "How can I save on taxes?",
      answer: "Invest in tax-saving instruments like ELSS, PPF, or NPS."
    },
    {
      question: "What are some effective saving habits?",
      answer: "Automate savings, track expenses, avoid impulse purchases."
    },
    {
      question: "How do I start investing in the stock market?",
      answer: "Open a demat account, research stocks, and start with small investments."
    },
    {
      question: "What are blue-chip stocks?",
      answer: "Stocks of large, stable companies with a track record of reliable performance."
    },
    {
      question: "What is a stock dividend?",
      answer: "A portion of a company’s profits distributed to shareholders."
    },
    {
      question: "What is the P/E ratio?",
      answer: "The price-to-earnings ratio evaluates if a stock is overvalued or undervalued."
    },
    {
      question: "What is FIRE (Financial Independence, Retire Early)?",
      answer: "A movement focused on extreme saving and investing to retire early."
    },
    {
      question: "How much do I need to retire in my 30s?",
      answer: "Calculate using: Retirement Corpus = Annual Expenses × 25."
    },
    {
      question: "What are the challenges of early retirement?",
      answer: "Longevity risk, inflation, and ensuring your investments generate steady returns."
    },
    {
      question: "When is the right time to buy a car?",
      answer: "Buy a car only when you can afford at least a 20% down payment and EMIs are <10% of your monthly income."
    },
    {
      question: "Should I buy or lease a car?",
      answer: "Buy if you plan to keep it for long. Lease for flexibility and lower upfront costs."
    },
    {
      question: "What is the 20/4/10 rule for buying a car?",
      answer: "Put down 20%, finance for no more than 4 years, and keep total car expenses <10% of monthly income."
    },
    {
      question: "How do I decide between renting and buying a house?",
      answer: "Compare monthly rent vs. EMI costs and factor in maintenance and long-term appreciation."
    },
    {
      question: "What is the 50/30/20 rule?",
      answer: "A budgeting rule: 50% needs, 30% wants, 20% savings/investments."
    },
    {
      question: "What is the rule of 72?",
      answer: "Divide 72 by your investment’s annual return to estimate how many years it will take to double."
    },
    {
      question: "What is the 4% rule?",
      answer: "Withdraw 4% of your retirement corpus annually for a sustainable income."
    },
    {
      question: "What is dollar-cost averaging?",
      answer: "Investing a fixed amount regularly, regardless of market conditions."
    },
    {
      question: "How can I reduce daily expenses?",
      answer: "Cook at home, use public transport, and minimize subscriptions."
    },
    {
      question: "How to save for a down payment on a house?",
      answer: "Set a target amount, open a dedicated savings account, and cut non-essential expenses."
    },
    {
      question: "What are some money-saving apps?",
      answer: "Apps like Mint, YNAB (You Need A Budget), and Goodbudget can track and optimize spending."
    },
    {
      question: "How to plan for a wedding?",
      answer: "Set a budget, prioritize expenses, and explore cost-saving options."
    },
    {
      question: "How to save for your child’s education?",
      answer: "Start early with child education plans, mutual funds, or PPF."
    },
    {
      question: "How to prepare for medical emergencies?",
      answer: "Invest in health insurance and maintain an emergency fund."
    },
    {
      question: "What are credit scores, and why do they matter?",
      answer: "A credit score reflects your creditworthiness and affects loan approvals and interest rates."
    },
    {
      question: "How can I improve my credit score?",
      answer: "Pay bills on time, keep credit utilization low, and avoid frequent loan applications."
    },
    {
      question: "What is the difference between good debt and bad debt?",
      answer: "Good debt, like education loans, helps build assets. Bad debt, like credit card debt, does not."
    },
    {
      question: "How can I avoid impulse buying?",
      answer: "Use a 30-day rule: Wait 30 days before making large purchases."
    },
    {
      question: "What are some ways to increase income?",
      answer: "Freelancing, side hustles, or investing in skill development."
    },
    {
      question: "How to plan for inflation?",
      answer: "Invest in assets that grow faster than inflation, like stocks or real estate."
    },
    {
      question: "What is financial freedom?",
      answer: "When your passive income covers all your expenses."
    },
    {
      question: "How can I secure my retirement savings?",
      answer: "Diversify investments, reduce debt, and avoid high-risk options as you near retirement."
    },
    {
      question: "Is renting always throwing money away?",
      answer: "Not necessarily. Renting can be more cost-effective depending on your location and goals."
    },
    {
      question: "Should I pay off my mortgage early?",
      answer: "Only if you’ve maxed out higher-return investments."
    },
    {
      question: "Can I invest with a low income?",
      answer: "Yes, start with SIPs or fractional investing."
    },
    {
      question: "Do I need a financial advisor?",
      answer: "It depends on your financial knowledge and the complexity of your goals."
    },
    {
      question: "Is gold a good investment?",
      answer: "Gold is a safe-haven asset but provides lower long-term returns compared to stocks."
    },
    {
      question: "When should I splurge on luxury items?",
      answer: "After securing savings, paying off debts, and meeting investment goals."
    },
    {
      question: "How can I save while shopping online?",
      answer: "Use coupon codes, cashback apps, and compare prices."
    },
    {
      question: "What are some tips for negotiating prices?",
      answer: "Research market rates, be polite but firm, and ask for discounts."
    },
    {
      question: "How much should I spend on a vacation?",
      answer: "Limit travel expenses to 5-10% of your annual income."
    },
    {
      question: "When is it okay to use a credit card?",
      answer: "For planned expenses you can pay off in full before the due date."
    }
  ];
    const faqContainer = document.getElementById("faq-container");
  
    faqs.forEach((faq, index) => {
      const faqItem = document.createElement("div");
      faqItem.classList.add("faq-item");
  
      faqItem.innerHTML = `
        <div class="faq-question">${faq.question} <span class="arrow">&#9654;</span></div>
        <div class="faq-answer">${faq.answer}</div>
      `;
  
      faqItem.querySelector(".faq-question").addEventListener("click", () => {
        const answer = faqItem.querySelector(".faq-answer");
        const arrow = faqItem.querySelector(".arrow");
  
        if (answer.style.display === "block") {
          answer.style.display = "none";
          arrow.innerHTML = "&#9654;"; // Right arrow
        } else {
          answer.style.display = "block";
          arrow.innerHTML = "&#9660;"; // Down arrow
        }
      });
  
      faqContainer.appendChild(faqItem);
    });
  });
  