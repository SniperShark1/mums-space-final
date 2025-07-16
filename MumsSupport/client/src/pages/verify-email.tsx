export default function VerifyEmailPage() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "#f9c5d1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Bodoni Moda, serif",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div>
        <h1 style={{ fontSize: "32px", marginBottom: "20px", color: "#333" }}>
          💌 Verify Your Email
        </h1>
        <p style={{ fontSize: "18px", color: "#555" }}>
          We’ve sent a link to your email address. <br />
          Please click it to verify your account.
        </p>
        <p style={{ fontSize: "16px", marginTop: "20px", color: "#777" }}>
          Once verified, you can return and log in.
        </p>
      </div>
    </div>
  );
}