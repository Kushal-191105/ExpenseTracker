import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await API.post("/users/forgotpassword", { email });
      
      // In a real app, this would just say "Check your email"
      // Since we bypassed email sending, we show the reset link in the toast!
      const resetLink = `${window.location.origin}/reset-password/${response.data.resetToken}`;
      
      toast.success(
        <div>
          {response.data.message}
          <br />
          <a href={resetLink} style={{ color: "white", textDecoration: "underline", fontWeight: "bold" }}>
            Click here to Reset Password
          </a>
        </div>,
        { autoClose: false } // Keep the toast open so they can click the link
      );

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to generate reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Forgot Password</h2>
            
            <form onSubmit={handleForgotPassword}>
              <div className="mb-3">
                <label className="form-label">Enter your registered email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                {loading ? "Sending..." : "Get Reset Link"}
              </button>
            </form>

            <p className="text-center mt-3">
              Remembered your password? <Link to="/">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
