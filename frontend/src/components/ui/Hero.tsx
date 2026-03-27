import { Button } from './button';

type HeroProps = {
  className?: string;
};

function Hero({ className, ...props }: HeroProps) {
  return (
    <main className={''} {...props}>
      <div>
        <h1>Lorem, ipsum dolor.</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, dolor
          in consectetur aspernatur ad at, dicta fuga expedita commodi corrupti
          quo aliquid placeat est autem aliquam impedit explicabo assumenda
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium,
          obcaecati? iste.
        </p>
        <div>
          <Button>Stwórz CV online</Button>
          <Button>Ulepsz swoje CV</Button>
        </div>
      </div>
      <div>
        <img
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
    </main>
  );
}

export { Hero };
