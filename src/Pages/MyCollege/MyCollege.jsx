import Swal from "sweetalert2";
import SectionTitle from "../../components/SectionTitle";
import useAdmissionData from "../../hooks/useAdmissionData";
import useAuth from "../../hooks/useAuth";

const MyCollege = () => {
  const { admissionData, admissionDataLoading, refetch } = useAdmissionData();
  const { user } = useAuth();

  const handleReview = (id) => {
    Swal.fire({
      title: "Send Feedback",
      icon: "info",
      html:
        '<input type="text" id="review_text" placeholder="Enter your feedback" class="input w-full max-w-xs border-primary" required>' +
        '<input type="number" id="rating" placeholder="Enter a number (0-5)" class="input w-full max-w-xs border-primary mt-5" required>',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Send",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const review_text = document.getElementById("review_text").value;
        const rating = document.getElementById("rating").value;
        const review = {
          review_text,
          rating,
          reviewer_name: user.displayName,
          reviewer_email: user.email,
        };
        fetch(`http://localhost:5000/review/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(review),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.result.modifiedCount > 0) {
              refetch();
              Swal.fire({
                icon: "success",
                title: "Review Sent Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };

  return (
    <div>
      <SectionTitle title="My College" />
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-lg">
              <th></th>
              <th>Your Name</th>
              <th>College Name</th>
              <th>Subject</th>
              <th>Applied Date</th>
              <th>Action</th>
            </tr>
          </thead>
          {admissionDataLoading ? (
            <div className="flex justify-center items-center">
              <span className="loading loading-bars loading-lg"></span>
            </div>
          ) : (
            <tbody>
              {admissionData.map((data, index) => (
                <tr key={data._id}>
                  <td>{index + 1}</td>
                  <td>{data.studentName}</td>
                  <td>{data.collegeName}</td>
                  <td>{data.subject}</td>
                  <td>{data.appliedDate}</td>
                  <td>
                    {data.reviewed === true ? (
                      <button
                        onClick={() => handleReview(data.collegeId)}
                        className="btn btn-outline btn-primary"
                        disabled
                      >
                        Already Reviewed
                      </button>
                    ) : (
                      <button
                        onClick={() => handleReview(data.collegeId)}
                        className="btn btn-outline btn-primary"
                      >
                        Review
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default MyCollege;
