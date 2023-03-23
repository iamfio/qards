'use client'

import CookieConsent from 'react-cookie-consent'

const QCookieConsent = () => {
  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText="Let's Go!"
        cookieName="qardsAppCookie"
        expires={90}
        overlay
      >
        <p>Hello friend! 👋</p>
        <p>
          We are proud that you choose our app to make your life easier. To make
          it happen, we are using cookies.
        </p>
        <p>If you are Ok with it, welcome!</p>
      </CookieConsent>
    </>
  )
}

export default QCookieConsent
