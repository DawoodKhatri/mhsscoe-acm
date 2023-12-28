import React from "react";
import Glassmorphism from "../common/glassmorphism";
import { Col, Row } from "antd";
import dayjs from "dayjs";

const EventDetails = ({
  startDate,
  endDate,
  registrationEndDate,
  entryFees,
  membersEntryFees,
}) => {
  return (
    <Glassmorphism className="p-5">
      <h3 className="text-xl md:text-2xl font-bold mb-5">Event Details</h3>
      <Row className="gap-2 md:gap-3 [&>div>p]:text-base md:[&>div>p]:text-lg text-gray-700">
        <Col span={24}>
          <p>
            <span className="font-semibold">Start Date: </span>
            {dayjs(startDate).format("ddd, MMM D, YYYY h:mm A")}
          </p>
        </Col>
        <Col span={24}>
          <p>
            <span className="font-semibold">End Date: </span>
            {dayjs(endDate).format("ddd, MMM D, YYYY h:mm A")}
          </p>
        </Col>

        <Col span={24}>
          <p>
            <span className="font-semibold">Registration Ends: </span>
            {dayjs(registrationEndDate).format("ddd, MMM D, YYYY h:mm A")}
          </p>
        </Col>
        <Col span={24}>
          <p>
            <span className="font-semibold">Entry Fees: </span>₹{entryFees}
          </p>
        </Col>
        <Col span={24}>
          <p>
            <span className="font-semibold">Entry Fees (Members): </span>₹
            {membersEntryFees}
          </p>
        </Col>
      </Row>
    </Glassmorphism>
  );
};

export default EventDetails;
