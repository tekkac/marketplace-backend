interface UpDownChevronsProps {
  className?: string;
  size?: number;
}

export default function UpDownChevrons({ className }: UpDownChevronsProps) {
  return (
    <svg className={className ?? ""} viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.04995 5.15002C0.899952 5.00002 0.824951 4.81669 0.824951 4.60002C0.824951 4.38336 0.899952 4.20002 1.04995 4.05002L4.47495 0.625024C4.55828 0.541691 4.64162 0.483358 4.72495 0.450024C4.80828 0.416691 4.89995 0.400024 4.99995 0.400024C5.08328 0.400024 5.17078 0.416691 5.26245 0.450024C5.35412 0.483358 5.44162 0.541691 5.52495 0.625024L8.94995 4.05002C9.09995 4.20002 9.17495 4.38336 9.17495 4.60002C9.17495 4.81669 9.09995 5.00002 8.94995 5.15002C8.79995 5.30002 8.61662 5.37502 8.39995 5.37502C8.18328 5.37502 7.99995 5.30002 7.84995 5.15002L4.99995 2.30002L2.14995 5.15002C1.99995 5.30002 1.81662 5.37502 1.59995 5.37502C1.38329 5.37502 1.19995 5.30002 1.04995 5.15002ZM4.99995 17.7C4.91662 17.7 4.82912 17.6834 4.73745 17.65C4.64578 17.6167 4.55828 17.5584 4.47495 17.475L1.04995 14.05C0.899952 13.9 0.824951 13.7167 0.824951 13.5C0.824951 13.2834 0.899952 13.1 1.04995 12.95C1.19995 12.8 1.38329 12.725 1.59995 12.725C1.81662 12.725 1.99995 12.8 2.14995 12.95L4.99995 15.8L7.84995 12.95C7.99995 12.8 8.18328 12.725 8.39995 12.725C8.61662 12.725 8.79995 12.8 8.94995 12.95C9.09995 13.1 9.17495 13.2834 9.17495 13.5C9.17495 13.7167 9.09995 13.9 8.94995 14.05L5.52495 17.475C5.44162 17.5584 5.35828 17.6167 5.27495 17.65C5.19162 17.6834 5.09995 17.7 4.99995 17.7Z"
        fill="#F3F0EE"
      />
    </svg>
  );
}