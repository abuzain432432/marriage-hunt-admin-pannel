'use client';
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';
import { UserType } from '@/types';
import {
  formateDate,
  formateDateInDaysAgo,
  getUserProfilePage,
} from '@/lib/utils';
import CustomAvatar from '@/components/ui/CustomAvatar';
import UserReports from '../UserReports';
import { Button } from '@/components/ui/button';
import UserDelelteCofirmationModal from '../UserDelelteCofirmationModal';
// import * as timeago from 'timeago.js';

export default function UsersTable({ data }: { data: UserType[] }) {
  const [selectedUserId, setSelectedUserId] = useState<null | string>(
    null
  );
  const [toBeDeletedUser, setToBeDeletedUser] =
    useState<UserType | null>(null);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className='text-center whitespace-nowrap'>
            Premium User
          </TableHead>
          <TableHead className='w-[100px] whitespace-nowrap'>
            Age
          </TableHead>
          <TableHead className='w-[100px] whitespace-nowrap'>
            Gender
          </TableHead>
          <TableHead className='w-[100px] whitespace-nowrap'>
            Joined At
          </TableHead>

          <TableHead className='w-[100px] whitespace-nowrap '>
            Last sceen
          </TableHead>
          <TableHead className='w-[75px]'> Photo</TableHead>
          <TableHead className='w-[75px]'> Reports</TableHead>
          <TableHead className='w-[75px] whitespace-nowrap'>
            Profile page
          </TableHead>
          <TableHead className='w-[75px] whitespace-nowrap'>
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map(user => (
          <TableRow key={user._id}>
            <TableCell>{user.firstName}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className='text-center whitespace-nowrap'>
              {user.subscription ? 'True' : 'False'}
            </TableCell>
            <TableCell className='w-[100px] whitespace-nowrap'>
              {user.age}
            </TableCell>
            <TableCell className='w-[100px] whitespace-nowrap'>
              {user.gender}
            </TableCell>
            <TableCell className='w-[100px] whitespace-nowrap'>
              {formateDate(user.createdAt)}
            </TableCell>

            <TableCell className='w-[100px] whitespace-nowrap '>
              {user.lastSeen
                ? formateDateInDaysAgo(user.lastSeen).toString()
                : 'Never Active'}
            </TableCell>
            <TableCell className='w-[75px]'>
              <CustomAvatar
                photo={user.photo}
                altText={user?.firstName as string}
              />
            </TableCell>
            <TableCell className='w-[75px] text-center whitespace-nowrap'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      role='button'
                      onClick={() => setSelectedUserId(user._id)}
                    >
                      <span className='px-2 py-1 text-white rounded-full cursor-pointer bg-red-600 font-semibold'>
                        {user.reportCount}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Click here to view report history of this user
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell className='w-[75px] text-center whitespace-nowrap'>
              {user.active && user.subscription ? (
                <Link
                  className='text-cyan-600'
                  href={getUserProfilePage(user._id)}
                >
                  View
                </Link>
              ) : (
                <button className='text-red-600 cursor-not-allowed'>
                  Inactive
                </button>
              )}
            </TableCell>
            <TableCell className='w-[75px]'>
              <Button
                onClick={() => setToBeDeletedUser(user)}
                size='sm'
                variant={'outlineRed'}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {selectedUserId && (
        <UserReports
          onClose={() => setSelectedUserId(null)}
          id={selectedUserId}
        />
      )}
      <UserDelelteCofirmationModal
        onModalClose={() => setToBeDeletedUser(null)}
        user={toBeDeletedUser}
      />
    </Table>
  );
}
