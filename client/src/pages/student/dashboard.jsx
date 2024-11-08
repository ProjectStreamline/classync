import Header from "../../components/student/Header";
import NoticeBoard from "../../components/student/NoticeBoard";

function Dashboard() {
  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <Header />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <h2>Welcome to the Dashboard!</h2>
        <p>Here is where you can manage your courses and activities.</p>
      </div>
      <NoticeBoard />
    </div>
  );
}

export default Dashboard;
