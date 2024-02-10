import { ElementType, Fragment, ReactNode } from 'react';
import type { PolymorphicPropsWithoutRef } from 'react-polymorphic-types';

import styles from './styles.module.css';
import { cn } from '@/lib/utils';

export type TypeSizes =
  | 'xxl'
  | 'xl'
  | 'l'
  | 'm'
  | 's'
  | 'xs'
  | 'xxs'
  | 'xxxl'
  | 'caps'
  | 'm-20';

export const DefaultElement = 'p';

export type TextOwnProps = {
  size?: TypeSizes;
  allCaps?: boolean;
  responsive?: boolean;
  disableMarginBottom?: boolean;
  isMultiLine?: boolean;
  children?: ReactNode;
  className?: string;
  href?: string;
  as?: ElementType;
  htmlFor?: string;
};

export type TextProps<
  T extends React.ElementType = typeof DefaultElement
> = PolymorphicPropsWithoutRef<TextOwnProps, T>;

export const Text = <
  T extends React.ElementType = typeof DefaultElement
>({
  size = 's',
  allCaps,
  responsive,
  disableMarginBottom,
  isMultiLine = false,
  children,
  className,
  as,
  ...props
}: TextProps<T>) => {
  const Element: React.ElementType = as || DefaultElement;
  const multiLineCopy =
    isMultiLine && typeof children === 'string'
      ? children.split('\\n')
      : null;
  const classNames = cn(
    styles.text,
    styles[size],
    {
      [styles.allCaps]: allCaps,
      [styles.responsive]: responsive,
      [styles.disableMarginBottom]: disableMarginBottom,
    },
    className
  );

  return (
    <Element {...props} className={classNames}>
      {!multiLineCopy ? (
        children
      ) : (
        <>
          {multiLineCopy.map((item, index) => {
            const isLastItem = index === multiLineCopy.length - 1;
            return (
              <Fragment key={index}>
                {item}
                {!isLastItem && <br />}
              </Fragment>
            );
          })}
        </>
      )}
    </Element>
  );
};
