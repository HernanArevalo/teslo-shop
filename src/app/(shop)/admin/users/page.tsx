export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import { redirect } from 'next/navigation';

import { getPaginatedUsers } from '@/actions';
import { Pagination, Title } from '@/components';
import { UsersTable } from './ui';


export default async function UsersPage() {

  const { ok, users = [] } = await getPaginatedUsers();


  if ( !ok ) {
    redirect('/auth/login')
  }

  return (
    <>
      <Title title="Users" />

      <div className="mb-10">
        <UsersTable users={users} />

        <Pagination totalPages={3}/>
      </div>
    </>
  );
}