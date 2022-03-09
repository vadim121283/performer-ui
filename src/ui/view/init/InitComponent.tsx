import React, { useEffect, useState } from 'react';
import { InitViewModel } from '../../view-model/init/InitViewModel';

export const InitComponent = ({ model }: { model: InitViewModel }) => {
  const { initialize } = model;
  const [cantInit, setCantInit] = useState(false);

  useEffect(() => {
    const startInit = async () => {
      const init = await initialize();
      if (init === false) setCantInit(true);
    };
    startInit();
    // eslint-disable-next-line
  }, []);

  return <>{cantInit ? `Can't initialize app. Please check your client configuration and reload the page.` : `Initialization...`}</>;
};
