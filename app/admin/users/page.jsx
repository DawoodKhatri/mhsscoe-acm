"use client";
import Glassmorphism from "@/components/common/glassmorphism";
import SearchUser from "@/components/common/searchUser";
import UserRoleCard from "@/components/users/userRoleCard";
import { ROLES } from "@/constants/roles";
import UserService from "@/services/user";
import { Col, Empty, Row, message as showMessage } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AdminUsersPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    UserService.getUsersWithRole()
      .then(({ users = [] }) =>
        setUsers(
          users.sort(
            ({ role: userRoleA }, { role: userRoleB }) =>
              Object.values(ROLES).indexOf(userRoleA) -
              Object.values(ROLES).indexOf(userRoleB)
          )
        )
      )
      .catch((message) => showMessage.error(message));
  }, []);

  return (
    <div className="h-full flex flex-col gap-5">
      <Glassmorphism className="p-5">
        <SearchUser
          onUserSearched={({ _id: userId }) =>
            router.push(`/admin/users/${userId}`)
          }
        />
      </Glassmorphism>
      {users.length > 0 ? (
        <>
          
          <Row gutter={[32, 32]} justify="space-evenly">
            {users.map(({ _id, ...user }, index) => (
              <Col
                key={`admin_users_role_${index}`}
                span={12}
                sm={{ span: 8 }}
                md={{ span: 6 }}
              >
                <Link href={`/admin/users/${_id}`}>
                  <UserRoleCard {...user} />
                </Link>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <Glassmorphism className="flex-grow p-5 flex justify-center items-center">
          <Empty description="No Users Found" />
        </Glassmorphism>
      )}
    </div>
  );
};

export default AdminUsersPage;
