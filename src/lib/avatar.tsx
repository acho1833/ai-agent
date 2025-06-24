import { botttsNeutral, initials } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';

type Props = {
    seed: string;
    variant: 'botttsNeutral' | 'initials';
};

export const generateAvatarUri = ({ seed, variant }: Props) => {
    let avtar;

    if (variant === 'botttsNeutral') {
        avtar = createAvatar(botttsNeutral, { seed });
    } else {
        avtar = createAvatar(initials, { seed, fontWeight: 500, fontSize: 42 });
    }

    return avtar.toDataUri();
};
