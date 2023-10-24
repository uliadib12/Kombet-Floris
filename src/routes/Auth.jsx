import useDocumentTitle from "src/hooks/useDocumentTitle";
import { useEffect } from 'react';

function Auth(){
	useDocumentTitle("Auth");

	return (
		<div className="md:grid grid-cols-2 block">
			<div className="px-10">
				<div className="h-screen flex items-center">
					<div className="bg-red-200 rounded-sm flex h-min w-full flex-col px-6 py-8">
						<div className="text-center font-bold text-3xl mb-6">
							Login
						</div>
						<div className="flex mb-2">
						  <div className="mr-2">
						  	Email:
						  </div>
				          <input
				            type="email"
				            name="email"
				            placeholder="Email"
				            className="rounded-md bg-red-100 w-full"
				            // value={this.state.username}
				            // onChange={this.handleInputChange}
				          />
				        </div>
				        <div className="flex">
					      <div className="mr-2">
						  	Password:
						  </div>
				          <input
				            type="password"
				            name="password"
				            placeholder="Password"
				            className="rounded-md bg-red-100 w-full"
				            // value={this.state.password}
				            // onChange={this.handleInputChange}
				          />
				        </div>
				        <button className="mt-6">Login</button>
					</div>
				</div>
			</div>
			<div className="h-screen bg-red-300 md:block hidden overflow-hidden">
				<img src="https://www.eloraflorist.com/wp-content/uploads/2018/03/toko-rangkaian-bunga-mawar-di-samarinda.png" />
			</div>
		</div>
	);
}

export default Auth;