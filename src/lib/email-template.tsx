export function getWelcomeEmailTemplate(email: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to ParentNestly</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f9fafb;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
                padding: 40px 20px;
                text-align: center;
                color: white;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 700;
            }
            .header p {
                margin: 8px 0 0 0;
                font-size: 14px;
                opacity: 0.9;
            }
            .content {
                padding: 40px;
            }
            .greeting {
                font-size: 18px;
                font-weight: 600;
                color: #1f2937;
                margin-bottom: 20px;
            }
            .text-block {
                margin-bottom: 20px;
                font-size: 15px;
                line-height: 1.7;
                color: #4b5563;
            }
            .benefits {
                background-color: #fef3c7;
                border-left: 4px solid #f59e0b;
                padding: 20px;
                border-radius: 4px;
                margin: 30px 0;
            }
            .benefits-title {
                font-weight: 600;
                color: #92400e;
                margin-bottom: 12px;
            }
            .benefits ul {
                margin: 0;
                padding-left: 20px;
            }
            .benefits li {
                margin-bottom: 8px;
                color: #92400e;
                font-size: 14px;
            }
            .cta-button {
                display: inline-block;
                background-color: #f59e0b;
                color: white;
                padding: 12px 28px;
                text-decoration: none;
                border-radius: 6px;
                font-weight: 600;
                margin: 20px 0;
                transition: background-color 0.3s;
            }
            .cta-button:hover {
                background-color: #d97706;
            }
            .footer {
                background-color: #f3f4f6;
                padding: 30px 40px;
                text-align: center;
                font-size: 13px;
                color: #6b7280;
                border-top: 1px solid #e5e7eb;
            }
            .footer-links {
                margin-bottom: 15px;
            }
            .footer-links a {
                color: #f59e0b;
                text-decoration: none;
                margin: 0 10px;
            }
            .divider {
                height: 1px;
                background-color: #e5e7eb;
                margin: 20px 0;
            }
            .signature {
                margin-top: 20px;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <!-- Header -->
            <div class="header">
                <h1>🎉 Welcome to ParentNestly</h1>
                <p>Your trusted parenting companion</p>
            </div>

            <!-- Content -->
            <div class="content">
                <div class="greeting">Hello there, wonderful parent!</div>

                <div class="text-block">
                    Thank you for joining the ParentNestly community! We're thrilled to have you on board. We're dedicated to providing you with practical, evidence-based parenting insights and tips to make your parenting journey smoother and more enjoyable.
                </div>

                <!-- Benefits Section -->
                <div class="benefits">
                    <div class="benefits-title">📚 What You'll Get:</div>
                    <ul>
                        <li><strong>Weekly Parenting Tips:</strong> Expert advice on child development and behavior</li>
                        <li><strong>Activity Ideas:</strong> Fun and educational activities for all ages</li>
                        <li><strong>Practical Solutions:</strong> Real answers to common parenting challenges</li>
                        <li><strong>Community Insights:</strong> Learn from other parents in our community</li>
                        <li><strong>Exclusive Resources:</strong> Guides, checklists, and downloadable content</li>
                    </ul>
                </div>

                <div class="text-block">
                    Your first newsletter will arrive soon. In the meantime, feel free to check out our blog for more helpful articles and resources.
                </div>

                <div style="text-align: center;">
                    <a href="https://parentnestly.com/blog" class="cta-button">Visit Our Blog</a>
                </div>

                <div class="divider"></div>

                <div class="text-block">
                    If you have any questions or topics you'd like us to cover, we'd love to hear from you. Reply to this email or reach out through our website.
                </div>

                <div class="signature">
                    <strong>Warm regards,</strong><br>
                    The ParentNestly Team 👨‍👩‍👧‍👦
                </div>
            </div>

            <!-- Footer -->
            <div class="footer">
                <div class="footer-links">
                    <a href="https://parentnestly.com">Website</a>
                    <a href="https://parentnestly.com/blog">Blog</a>
                    <a href="https://parentnestly.com/contact">Contact</a>
                </div>
                <div>
                    <p style="margin: 0;">You received this email because you subscribed to ParentNestly.</p>
                    <p style="margin: 10px 0 0 0;">
                        <a href="https://parentnestly.com/unsubscribe" style="color: #f59e0b; text-decoration: none;">Unsubscribe</a> | 
                        <a href="https://parentnestly.com/preferences" style="color: #f59e0b; text-decoration: none;">Manage Preferences</a>
                    </p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
}
