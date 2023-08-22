import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { MdWarning } from 'react-icons/md';

import { SafeUser } from '@/app/types';

import useLoginModal from './useLoginModal';

interface UseFavoriteProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({
  listingId,
  currentUser,
}: UseFavoriteProps) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        toast('Log in first', {
          icon: '😁',
        });
        loginModal.onOpen();
      } else {
        try {
          let request;
          let toastMessage;

          if (hasFavorited) {
            request = () =>
              axios.delete(`/api/favorites/${listingId}`);
            toastMessage = 'Listing removed from favorite';
          } else {
            request = () => axios.post(`/api/favorites/${listingId}`);
            toastMessage = 'Listing added to favorite';
          }

          await request();
          router.refresh();
          toast.success(toastMessage);
        } catch (error) {
          toast.error('Something went wrong.');
        }
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );

  return { hasFavorited, toggleFavorite };
};

export default useFavorite;
