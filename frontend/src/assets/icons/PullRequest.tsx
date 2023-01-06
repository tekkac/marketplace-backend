interface Props {
  className?: string;
}

export default function PullRequest({ className }: Props) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg height="100%" viewBox="0 0 13 12" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.73671 3.86005C3.85235 4.28327 4.10391 4.65675 4.45265 4.92297C4.80139 5.18919 5.22797 5.3334 5.66671 5.33338H8.33338C9.11873 5.33344 9.87885 5.61073 10.4798 6.11639C11.0807 6.62204 11.4838 7.32359 11.618 8.09738C12.0705 8.245 12.4555 8.54909 12.704 8.95504C12.9524 9.36099 13.048 9.84221 12.9736 10.3123C12.8991 10.7824 12.6595 11.2105 12.2978 11.5199C11.9361 11.8292 11.476 11.9994 11 12C10.5344 12.0004 10.0832 11.8383 9.72431 11.5416C9.36539 11.245 9.12124 10.8324 9.03395 10.375C8.94666 9.91758 9.0217 9.44407 9.24614 9.03608C9.47057 8.62809 9.83033 8.3112 10.2634 8.14005C10.1477 7.71682 9.89618 7.34334 9.54744 7.07712C9.1987 6.8109 8.77212 6.6667 8.33338 6.66671H5.66671C4.94531 6.66778 4.2432 6.43374 3.66671 6.00005V8.11338C4.11171 8.27065 4.48677 8.58018 4.72562 8.98725C4.96446 9.39432 5.0517 9.87273 4.97192 10.3379C4.89214 10.8031 4.65047 11.2251 4.28963 11.5293C3.92879 11.8335 3.47201 12.0004 3.00005 12.0004C2.52808 12.0004 2.0713 11.8335 1.71046 11.5293C1.34962 11.2251 1.10795 10.8031 1.02817 10.3379C0.948388 9.87273 1.03563 9.39432 1.27447 8.98725C1.51332 8.58018 1.88838 8.27065 2.33338 8.11338V3.88671C1.89136 3.73065 1.51818 3.42434 1.27895 3.02123C1.03972 2.61811 0.949627 2.14379 1.0244 1.68104C1.09918 1.21828 1.33407 0.796476 1.68808 0.489223C2.0421 0.181969 2.49277 0.00877899 2.96144 -0.000126893C3.43011 -0.00903278 3.88703 0.146912 4.25247 0.440494C4.6179 0.734076 4.86865 1.14665 4.96095 1.60623C5.05325 2.06581 4.98125 2.54321 4.7575 2.95512C4.53376 3.36704 4.17248 3.68731 3.73671 3.86005V3.86005ZM3.00005 2.66671C3.17686 2.66671 3.34643 2.59648 3.47145 2.47145C3.59647 2.34643 3.66671 2.17686 3.66671 2.00005C3.66671 1.82324 3.59647 1.65367 3.47145 1.52864C3.34643 1.40362 3.17686 1.33338 3.00005 1.33338C2.82323 1.33338 2.65367 1.40362 2.52864 1.52864C2.40362 1.65367 2.33338 1.82324 2.33338 2.00005C2.33338 2.17686 2.40362 2.34643 2.52864 2.47145C2.65367 2.59648 2.82323 2.66671 3.00005 2.66671ZM3.00005 10.6667C3.17686 10.6667 3.34643 10.5965 3.47145 10.4715C3.59647 10.3464 3.66671 10.1769 3.66671 10C3.66671 9.82324 3.59647 9.65367 3.47145 9.52864C3.34643 9.40362 3.17686 9.33338 3.00005 9.33338C2.82323 9.33338 2.65367 9.40362 2.52864 9.52864C2.40362 9.65367 2.33338 9.82324 2.33338 10C2.33338 10.1769 2.40362 10.3464 2.52864 10.4715C2.65367 10.5965 2.82323 10.6667 3.00005 10.6667ZM11 10.6667C11.1769 10.6667 11.3464 10.5965 11.4714 10.4715C11.5965 10.3464 11.6667 10.1769 11.6667 10C11.6667 9.82324 11.5965 9.65367 11.4714 9.52864C11.3464 9.40362 11.1769 9.33338 11 9.33338C10.8232 9.33338 10.6537 9.40362 10.5286 9.52864C10.4036 9.65367 10.3334 9.82324 10.3334 10C10.3334 10.1769 10.4036 10.3464 10.5286 10.4715C10.6537 10.5965 10.8232 10.6667 11 10.6667Z" />
      </svg>
    </div>
  );
}