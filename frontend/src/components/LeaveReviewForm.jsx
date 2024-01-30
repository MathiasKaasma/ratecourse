import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

function getDate() {
  // Get current date
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = dd + "/" + mm + "/" + yyyy;
  return today;
}

async function postReview({ data, courseId }) {
  // Post review
  const response = await fetch(
    `http://localhost:5000/api/courses/${courseId}`,
    {
      method: "POST",
      body: JSON.stringify({
        review: data.hinnang,
        overall: data.üldine,
        post_date: getDate(),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  return response;
}

function LeaveReview({ courseId }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await postReview({ data, courseId });
      window.location.reload();
    } catch (err) {
      setError("root", {
        message: "Hinnangu esitamisel tekkis viga",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <input
        {...register("üldine", {
          required: true,
          maxValue: {
            value: 5,
            message: "Hinnang ei saa olla üle viie",
          },
        })}
        type="number"
        placeholder="Üldine"
      />
      <input
        {...register("hinnang", {
          required: "Hinnangu lisamine on vajalik",
          maxLength: {
            value: 5,
            message: "Hinnang ei saa olla pikem kui 5 tähemärki",
          },
        })}
        type="text"
        placeholder="Hinnang"
      />
      {errors.hinnang && <div>{errors.hinnang.message}</div>}
      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Laeb..." : "Esita"}
      </button>
      {errors.root && <div>{errors.root.message}</div>}
    </form>
  );
}

export default LeaveReview;
