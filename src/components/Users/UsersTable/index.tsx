import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import {
  LINKS,
  PUBLIC_IMAGE_BASE_URL,
  WEBSITE_BASE_URL,
} from '@/lib/contants';
import CustomPagination from '@/components/ui/CustomPagination';
import { UserType } from '@/types';
import Image from 'next/image';
import { formateDate, formateDateInDaysAgo } from '@/lib/utils';
// import * as timeago from 'timeago.js';

export default function UsersTable({ data }: { data: UserType[] }) {
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
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(user => (
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
                ? formateDateInDaysAgo(user.lastSeen)
                : 'Never Active'}
            </TableCell>
            <TableCell className='w-[75px]'>
              <div className='w-[35px] relative overflow-hidden mx-auto h-[35px] bg-gray-300 rounded-full'>
                <Image
                  alt={`${user?.firstName}`}
                  fill
                  sizes='50px'
                  className='w-auto h-auto'
                  src={`${PUBLIC_IMAGE_BASE_URL}/${user.photo}`}
                />
              </div>
            </TableCell>
            <TableCell className='w-[75px] text-center whitespace-nowrap'>
              <Link className='text-red-600' href={LINKS.USERS}>
                View
              </Link>
            </TableCell>
            <TableCell className='w-[75px] text-center whitespace-nowrap'>
              {user.active && user.subscription ? (
                <Link
                  className='text-cyan-600'
                  href={`${WEBSITE_BASE_URL}/partnersuggestions/${user._id}`}
                >
                  View
                </Link>
              ) : (
                <button className='text-red-600 cursor-not-allowed'>
                  Inactive
                </button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
